import { createContext, ReactNode, useContext, useState } from "react"
import { CheckOutInput } from "../components/CheckOut"
import { ShoppingCart } from "../components/ShoppingCart"
import Axios, { AxiosResponse } from "axios";
import { ProductsProps } from "../pages/usercatalog";
import { useNavigate } from "react-router-dom";


type CartItem = {
    id: string
    quantity: number
}
type ShoppingCartProviderProps = {
    children: ReactNode
}
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    CheckOutOpen: () => void
    CheckOutClose: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    cartQuantity: number
    cartItems: CartItem[]
    storeItems:ProductsProps[]
    isCheckOutOpen:boolean
    handleCheckOut: (payment_info:CheckOutInput) => void
    getTotalPriceFromCart: () => number
    getUsername:  () => string | undefined
    LoginCart: (cartitems:CartItem[]) => void
    StoreAllItems:(storeitems:ProductsProps[]) => void
    clearCache:() => void
    refreshCart:() => void
}
const ShoppingCartContext = createContext({} as ShoppingCartContext)
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children}: ShoppingCartProviderProps) {
    const [storeItems,setstoreItems]=useState<ProductsProps[]>([])
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const navigate= useNavigate()
    const [isCheckOutOpen, setisCheckOutOpen] = useState(false)
    let cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      )
    
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    const CheckOutOpen = () => setisCheckOutOpen(true)
    const CheckOutClose = () => setisCheckOutOpen(false)
    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function getTotalPriceFromCart(){
    return (
        cartItems.reduce((total, cartItem) => {
          const item = storeItems.find(i => i.id === cartItem.id)
          return total + (item?.price || 0) * cartItem.quantity
        }, 0))
    }
    async function handleCartIncrease(FormValue:{id:string,quantity:number}){
            const body = FormValue
            let user = localStorage.getItem("user");
            if (user !== null) {
                let userObj = JSON.parse(user);
                Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
                const res = await Axios.put('http://localhost:8000/cart',
                body
                    ).then((res: AxiosResponse) => {
                    }).catch((error)=>{
                        //TODO:CATCH
                    })
            }
    }
    function increaseCartQuantity(id: string) {
        
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
        handleCartIncrease({id:id,quantity:1})
    }
    async function handleCartDecrease(FormValue:{id:string,quantity:number}){
        let tempbody = FormValue
        let user = localStorage.getItem("user");
        if (user !== null) {
            let userObj = JSON.parse(user);
            Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
            const body = {data:tempbody}
            const res = await Axios.delete('http://localhost:8000/cart',
            body
                ).then((res: AxiosResponse) => {
                }).catch((error)=>{
                    //TODO:CATCH
                })
        }
}

    function decreaseCartQuantity(id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
        handleCartDecrease({id:id,quantity:1})
    }
    function removeFromCart(id: string) {
        const quantity = cartItems.find( items => items.id === id)?.quantity
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
        if(quantity){
        handleCartDecrease({id:id,quantity:quantity})
        }

    }
    function clearCache() {
        setCartItems([])
        cartQuantity = 0

    }

    async function handleCheckOut(payment_info:CheckOutInput) {
       await refreshCart()
        const body = {shippingAddress:payment_info.shippingAddress,paymentMethod:{cc: payment_info.cc,
        holder: payment_info.holder,
        cvv: payment_info.cvv,
        exp: payment_info.exp,
        charge: payment_info}}

        let user =  localStorage.getItem("user");
        if (user !== null) {
          let userObj = JSON.parse(user);
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
        const res =  await Axios.post('http://localhost:8000/cart/checkout',
            body
        ).then((res: AxiosResponse) => {
            closeCart()
            navigate("/usercatalog/checkedout")

        }). catch(()=>{});
      }
        CheckOutClose()
            return true
    
    }
    function getUsername() {
        let user = localStorage.getItem("user");
        let userObj =  user ? JSON.parse(user) : "Null"
        return userObj.username
    }
    async function refreshCart() {
        let temparray = storeItems.map(x => x.id);
        const existcart = cartItems.filter(x => temparray.includes(x.id));
        // request update cart
         
        setCartItems(existcart)
        
    }
    function LoginCart(cartitems:CartItem[]) {
        setCartItems(cartitems)
    }
     function StoreAllItems(storeitems:ProductsProps[]) {
        setstoreItems(storeitems)
    }

    

    return <ShoppingCartContext.Provider value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        CheckOutClose,
        CheckOutOpen,
        getTotalPriceFromCart,
        cartItems,
        cartQuantity,
        storeItems,
        isCheckOutOpen,
        handleCheckOut,
        getUsername,
        LoginCart,
        StoreAllItems,
        clearCache,
        refreshCart
      }}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}
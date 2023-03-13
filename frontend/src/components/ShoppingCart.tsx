import { Button, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
// import { CartItem } from "./CartItem"
import { CartItem } from "./CartItem"
import {CheckOut} from "./CheckOut"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems,storeItems,isCheckOutOpen,CheckOutOpen} = useShoppingCart()

    const total = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(i => i.id === cartItem.id)
      return total + (item?.price || 0) * cartItem.quantity
    }, 0))
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {!isCheckOutOpen ? (
            <div>

        <Stack gap={3}>
          {cartItems.map(item => (
              <CartItem key={item.id} {...item} />
              ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {total}
          </div>
        </Stack>
        <Button className="w-100" onClick={CheckOutOpen}>CheckOut</Button>
        </div>
        ):
        <CheckOut/>
        }

      </Offcanvas.Body>
    </Offcanvas>
    
  )
}
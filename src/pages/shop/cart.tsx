import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { SetCart, SetWishList } from "../../redux/shopping/shopping.action";
import { Products } from "../../_interfaces/product.interfaces";

const CartPage = () => {
  const { cart, wishlist } = useAppSelector((state) => state.globalState);
  const [productList, setProductList] = useState<Products[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const uniqueData = [];
    const encounteredIds = new Set();
    const idCounts = {};

    for (const item of cart) {
      if (!encounteredIds.has(item.id)) {
        encounteredIds.add(item.id);
        uniqueData.push({
          ...item,
          qty: cart.filter((x) => x.id === item.id)?.length || 1,
        });
      }
    }

    setProductList(uniqueData);
  }, [cart]);

  useEffect(() => {
    const total = productList.reduce((acc, item) => {
      const subtotal = item.price * (item?.qty ?? 0);
      return acc + subtotal;
    }, 0);

    setTotalPrice(total);
  }, [productList]);

  const AddWishlist = (data: Products) => {
    const arr = [...wishlist];

    let idx = arr.findIndex((item) => {
      return item.id === data.id;
    });

    if (idx !== -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(data);
    }

    dispatch(SetWishList(arr));
  };

  const RemoveItem = (idx: number, id: number) => {
    const arrPrd = [...productList];
    const arrCart = [...cart];

    arrPrd.splice(idx, 1);
    setProductList(arrPrd);

    dispatch(SetCart(arrPrd));
  };

  return (
    <div className="p-5 md:px-[10rem] md:py-[3rem]">
      <div>
        <Link to="/">
          <h3 className="text-3xl font-bold mb-5 cursor-pointer"><i className="fa-solid fa-arrow-left"></i> Shopping Cart</h3>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-lg md:col-span-2 overflow-hidden card-shadow p-4">
          <h3 className="font-semibold">Cart ({cart?.length} items) </h3>
          {(cart?.length === 0 || cart === undefined) && (
            <div className="text-center mt-[5rem]">
              <h3 className="text-xl">No Items</h3>
            </div>
          )}
          <div className="mt-4">
            {productList?.map((dt, i) => (
              <div key={i}>
                <div className="grid md:grid-cols-3 border-b-2 py-5" key={i}>
                  <div>
                    <img src={dt?.img} alt={dt?.name} />
                  </div>
                  <div>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{dt?.name}</div>
                      <table className="text-gray-500 text-sm">
                        <tbody>
                          <tr>
                            <td className="pb-2">Size: </td>
                            <td className="pb-2">{dt?.description?.size}</td>
                          </tr>
                          <tr>
                            <td className="pb-2">Type: </td>
                            <td className="pb-2">{dt?.description?.type}</td>
                          </tr>
                          <tr>
                            <td className="pb-2">From: </td>
                            <td className="pb-2">{dt?.description?.from}</td>
                          </tr>
                          <tr className="align-sub">
                            <td className="pb-2">Note: </td>
                            <td className="pb-2">{dt?.description?.note}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex gap-2">
                      <button
                        className="rounded-full font-semibold p-2 text-sm hover:bg-gray-300"
                        onClick={() => RemoveItem(i, dt?.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i> &nbsp; REMOVE
                        ITEM
                      </button>
                      <button
                        className="rounded-full font-semibold p-2 text-sm hover:bg-gray-300"
                        onClick={() => AddWishlist(dt)}
                      >
                        <i
                          className={
                            !wishlist?.filter((item) => item.id === dt?.id)[0]
                              ? `fa-regular fa-heart`
                              : `fa-solid fa-heart text-pink-500`
                          }
                        ></i>{" "}
                        &nbsp;
                        {/* <i className="fa-solid fa-heart text-pink-500"></i> &nbsp; */}
                        Wishlist
                      </button>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="flex">
                      <button
                        className="border h-[35px] px-[10px]"
                        disabled={dt?.qty === 1}
                        onClick={() => {
                          const list = [...productList];
                          list[i].qty = (list[i]?.qty ?? 0) - 1;
                          setProductList(list);
                        }}
                      >
                        -
                      </button>
                      <input
                        className="border h-[35px] text-sm w-[3rem] text-center p-[5px]"
                        value={dt?.qty}
                        onChange={(e) => {
                          const list = [...productList];
                          if (+e.target.value > 0) {
                            list[i].qty = parseInt(e.target.value, 10) || 1;
                          }
                          setProductList(list);
                        }}
                        type="number"
                      />
                      <button
                        className="border h-[35px] px-[10px]"
                        onClick={() => {
                          const list = [...productList];
                          list[i].qty = (list[i]?.qty ?? 0) + 1;
                          setProductList(list);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <small className="text-gray-500">(Note, 1 pcs )</small>
                    <div className="mt-[8rem]">
                      <p className="text-sm text-gray-500 mb-3">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(dt?.price)}{" "}
                        x {dt?.qty}
                      </p>
                      <span className="font-bold ">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(dt?.price * (dt?.qty ?? 0))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-lg overflow-hidden p-4 card-shadow max-h-[20rem]">
            <h3 className="font-semibold">The total amount of </h3>
            <div>
              <table className="w-full mt-5">
                <tbody>
                  <tr>
                    <td className="text-gray-500">Temporary Amount</td>
                    <td className="text-right text-gray-500">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(totalPrice)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500">Shipping</td>
                    <td className="text-gray-500 text-right">Free</td>
                  </tr>
                </tbody>
              </table>
              <hr className="my-4" />
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-gray-500 font-bold">
                      The total amount of (including VAT)
                    </td>
                    <td className="text-right text-gray-500">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-[5.5rem]">
                <button
                  disabled={cart?.length === 0 || cart === undefined}
                  className={`p-4 rounded py-[10px] px-[20px] w-full ${
                    cart?.length === 0
                      ? "bg-gray-400 text-gray-600"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  GO TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg mt-4 text-gray-500 overflow-hidden p-4 card-shadow max-h-[20rem]">
            Add a discount code ( optional )
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

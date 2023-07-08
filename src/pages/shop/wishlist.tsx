import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { SetCart, SetWishList } from "../../redux/shopping/shopping.action";
import { Products } from "../../_interfaces/product.interfaces";

const WishListPage = () => {
  const dispatch = useAppDispatch();
  const { wishlist, cart } = useAppSelector((state) => state.globalState);

  const AddWishlist = (data: Products) => {
    const arr = [...wishlist];

    let idx = arr.findIndex(function (item) {
      return item.id === data.id;
    });

    if (idx !== -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(data);
    }

    dispatch(SetWishList(arr));
  };

  const AddCart = (data: Products) => {
    const arr = [...cart];
    arr.push(data);
    toast("Success add to cart");
    dispatch(SetCart(arr));
  };

  return (
    <>
      <div className="px-[2rem] pt-4">
        <div>
          <h3 className="text-3xl font-bold mb-5">Wishlist</h3>
        </div>
        <div className="grid md:grid-cols-3 justify-items-center ">
          {wishlist?.map((dt, i) => (
            <div className="max-w-sm mb-3 rounded overflow-hidden shadow-lg" key={i}>
              <img className="w-full" src={dt?.img} alt={dt?.name} />
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
                <h3 className="text-2xl mt-4 text-sky-500 font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(dt?.price)}
                </h3>
              </div>
              <div className="px-6 pt-4 pb-2 flex gap-2">
                <button
                  className=" rounded-full font-semibold p-2 text-sm hover:bg-gray-300"
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
                <button
                  className=" rounded-full font-semibold p-2 text-sm hover:bg-gray-300"
                  onClick={() => AddCart(dt)}
                >
                  <i className="fa-solid fa-cart-shopping"></i> &nbsp; Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {wishlist?.length === 0 && (
          <h3 className="text-xl">No Wishlist Here</h3>
        )}
      </div>
    </>
  );
};

export default WishListPage;

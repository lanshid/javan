import { Products } from "../../_interfaces/product.interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { SetCart, SetWishList } from "../../redux/shopping/shopping.action";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ListProductPage = () => {
  const dispatch = useAppDispatch();

  const { wishlist, cart } = useAppSelector((state) => state.globalState);

  const products: Products[] = [
    {
      id: 1,
      name: "Hoodie blue",
      img: "https://cf.shopee.co.id/file/e8d2a51eae3bc21333b4102dd47cc11e",
      price: 200000,
      description: {
        size: "L",
        type: "Hoodie",
        note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
        from: "Indonesia",
      },
    },

    {
      id: 2,
      name: "Hoodie Red",
      img: "https://cf.shopee.co.id/file/a4d3f97e55201ba6312e8d7dac0782d2",
      price: 250000,
      description: {
        size: "XL",
        type: "Hoodie",
        note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
        from: "Indonesia",
      },
    },

    {
      id: 3,
      name: "T-shirt Red",
      img: "https://down-id.img.susercontent.com/file/0b8c4a11216166195c966931721065c2",
      price: 150000,
      description: {
        size: "L",
        type: "T-shirt",
        note: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
        from: "Indonesia",
      },
    },
  ];

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
          <h3 className="text-3xl font-bold mb-5">Our Products</h3>
        </div>
        <div className="grid md:grid-cols-3 justify-items-center ">
          {products?.map((dt, i) => (
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
      </div>
    </>
  );
};

export default ListProductPage;

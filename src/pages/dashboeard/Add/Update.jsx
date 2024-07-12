// const inpref = useRef(null);

// useEffect(() => {
//     inpref.current?.focus();
//     let pro = () => {
//         axios
//             .get(`https://backend-kappa-beige.vercel.app/product/single/660dafb95737493603ed9ef8&${id}`)
//             .then((res) =>
//                 setProd({
//                     name: res.data.name,
//                     price: res.data.price,
//                     description: res.data.description,
//                     availableItems: res.data.availableItems,
//                     discount: res.data.discount,
//                 })
//             )
//             .catch((err) => console.log(err));
//     };
//     pro();
// }, [id]);
// let updateprd = (e) => {
//     axios
//         .patch(`https://backend-kappa-beige.vercel.app/product/${id}`, prod)
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
//     e.preventDefault();
//     Navigate("/products");
// };

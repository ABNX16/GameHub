import { useLocation, Link } from "react-router-dom";

const Adminnav = () => {
  const location = useLocation();

  const pages = [
    {
      name: "ADD product",
      icon: "https://cdn-icons-png.flaticon.com/512/7387/7387315.png", 
      path: "/addpro"
    },
    {
      name: "View Products",
      icon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/product-view-5-1146956.png",
      path: "/allpro"
    },
    {
      name: "Orders",
      icon: "https://img.icons8.com/ios-filled/50/000000/purchase-order.png",
      path: "/orderlist"
    },
    {
      name: "User",
      icon: "https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png",
      path: "/users"
    },
     {
      name: " User Seller's list",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGif59a7iQF7sim6HhsJo-CmkrHyWKz726xHF_rpSA0DJT0fu8R85w7IJrsfwY7vWSPbI&usqp=CAU",
      path: "/sellerlist"
    },
      {
      name: "Visited",
      icon: "https://static.thenounproject.com/png/2074179-200.png",
      path: "/visited"
    },
      {
      name: "Accpet",
      icon: "https://static.thenounproject.com/png/2074179-200.png",
      path: "/accpet"
    },
     {
      name: "LOG OUT",
      icon: "https://png.pngtree.com/png-vector/20190930/ourmid/pngtree-exit-door-glyph-icon-vector-png-image_1772310.jpg",
      path: "/"
    }
  ];

  return (
    <nav style={{ display: "flex", background: "white", padding: "10px 0", justifyContent: "space-around" }}>
      {pages.map((page) => (
        <Link
          key={page.name}
          to={page.path}
          style={{
            color: location.pathname === page.path ? "balck" : "black",
            textDecoration: "none",
            textAlign: "center",
            fontSize: "14px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={page.icon}
              alt={page.name}
              style={{ width: "30px", height: "30px", marginBottom: "5px" }}
            />
            {page.name}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default Adminnav;

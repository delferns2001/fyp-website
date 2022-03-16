// import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";

// export default function Backendfetch() {
//     const [data, setdata] = useState([]);

//     useEffect(() => {
//         fetch("/members")
//             .then((res) => res.json())
//             .then((data) => {
//                 setdata(data);
//                 console.log(data);
//             });
//     }, []);

//     return (
//         <Container style={{ paddingTop: "10vh" }}>
//             {typeof data.members === "undefined" ? (
//                 <p>Loading.....</p>
//             ) : (
//                 data.members.map((member, i) => <p key={i}> {member}</p>)
//             )}
//         </Container>
//     );
// }

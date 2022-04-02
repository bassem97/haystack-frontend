const Verification = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

            }}
        >
            <div style={{
                fontSize : "30px",
                fontWeight : "bold",

            }}
            >
                Your account has been created successfully 😊😊<br/>
                Please check your email in order to verify your account 👌
            </div>
            <div >
                <button  onClick={()=> window.location.href = "https://www.gmail.com"} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" style={{ padding: 10, marginTop: 20, marginLeft:10 }}>Open you email</button>
                <button  onClick={()=> window.location.href="/"} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" style={{ padding: 10, marginTop: 20, marginLeft:10 }}>Go to Homepage</button>
                <button  onClick={()=> window.location.href="/login"} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" style={{ padding: 10, marginTop: 20, marginLeft:10 }}>Login page</button>

            </div>
           </div>
    );
}
export default  Verification;

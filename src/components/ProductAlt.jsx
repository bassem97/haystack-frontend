import { Link } from 'react-router-dom'

const product = ({product}) => (
    <div className="w-75 max-w-m my-3 mx-4 rounded-md shadow-md overflow-hidden">
        <Link
            to={`/product/${product._id}`}
        >
        <div className="flex items-end justify-end h-56 w-full bg-cover bg-center bg-top" style={{backgroundImage: `url('http://localhost:8080/files/${product.image}')`}}>
            <button className={`p-4 rounded-full text-white mx-5 -mb-4 focus:outline-none`}
            style={{backgroundColor: product.color}}
            >
            </button>
        </div>
        <div className="px-5 py-3">
                <h3 className="text-gray-700 capitalize font-bold">{product.name}</h3>
            <span className="text-gray-500 mt-2">{product.price}TND</span>
        </div>
        </Link>
    </div>
)

export default product


// eslint-disable-next-line no-lone-blocks
{/* <button className="p-4 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
 <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
</button> */}

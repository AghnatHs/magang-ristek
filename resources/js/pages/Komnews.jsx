import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Untuk navigasi React Router

const Komnews = () => {
    const [data, setData] = useState({
        title: "",
        categories: [],
        komnews: [],
        headline: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Mengambil data dari API
        axios
            .get("/api/komnews") // Pastikan URL sesuai dengan route API Anda
            .then((response) => {
                setData({
                    title: response.data.title,
                    categories: response.data.categories,
                    komnews: response.data.komnews,
                    headline: response.data.headline,
                });
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching data");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto mt-8 px-4">
            <div className="flex space-x-2 mb-6">
                <Link
                    className="bg-white text-orangeTebal font-semibold px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-orangeTebal hover:text-white "
                    to="/komnews"
                >
                    All
                </Link>
                {data.categories.map((category, index) => (
                    <Link key={index} to={`/komnews/category/${category.slug}`}>
                        <p className="bg-orangeTebal text-white font-semibold px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-orangeTebal">
                            {category.name}
                        </p>
                    </Link>
                ))}
            </div>
            <div className="flex align-center items-center justify-center">
                <h1 className="flex flex-row text-[#f0e4d4] text-border text-shadow-black font-thin text-[50px] mb-4 font-sports align-center items-center">
                    {data.title}
                </h1>
                <hr className="my-4" />
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-4xl font-bold mb-2">TODAY HEADLINE!</h1>
                <img
                    src={data.headline.image}
                    alt={data.headline.title}
                    className="w-1/3 mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">
                    {data.headline.title}
                </h2>
                <p className="mb-4">{data.headline.content}</p>
                <Link
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    to={`/komnews/${data.headline.slug}`}
                >
                    Read More
                </Link>
                <hr className="my-4" />
            </div>

            <div>
                {data.komnews.slice(1).map((item, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-2">
                            {item.title}
                        </h2>
                        <p className="mb-4">{item.content}</p>
                        <p className="mb-4">
                            {new Date(item.created_at).toLocaleDateString()}
                        </p>

                        <Link
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            to={`/komnews/${item.slug}`}
                        >
                            Read More
                        </Link>

                        <div className="mt-2">
                            {item.categories.map((category, catIndex) => (
                                <Link
                                    key={catIndex}
                                    className="inline-block px-4 py-2 mr-2 mt-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100"
                                    to={`/komnews/category/${category.slug}`}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Komnews;

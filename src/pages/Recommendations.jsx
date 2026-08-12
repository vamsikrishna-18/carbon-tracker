import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { getRecommendations } from "../services/recommendationService";

function Recommendations() {

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        getRecommendations(user.id)
            .then((res) => {
                setRecommendations(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);

    const getColor = (priority) => {

        switch (priority) {

            case "HIGH":
                return "border-red-500 bg-red-50";

            case "MEDIUM":
                return "border-yellow-500 bg-yellow-50";

            default:
                return "border-green-500 bg-green-50";
        }

    };

    return (

        <UserLayout>

            <h1 className="text-3xl font-bold mb-6">
                Personalized Recommendations
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                {recommendations.map((item, index) => (

                    <div
                        key={index}
                        className={`border-l-4 rounded-lg shadow p-5 ${getColor(item.priority)}`}
                    >

                        <h2 className="text-xl font-semibold">
                            {item.category}
                        </h2>

                        <p className="mt-3 text-gray-700">
                            {item.recommendation}
                        </p>

                        <span className="inline-block mt-4 px-3 py-1 rounded-full bg-gray-800 text-white text-sm">
                            {item.priority}
                        </span>

                    </div>

                ))}

            </div>

        </UserLayout>

    );

}

export default Recommendations;
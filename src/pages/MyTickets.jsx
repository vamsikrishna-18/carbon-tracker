import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import { getUserTickets } from "../services/supportService";

function MyTickets() {

    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (user) {
            loadTickets();
        }

    }, []);

    const loadTickets = async () => {

        try {

            const response = await getUserTickets(user.id);

            setTickets(response.data);

        } catch (error) {

            console.error("Error loading tickets:", error);

        }

    };

    const getStatusColor = (status) => {

        switch (status) {

            case "OPEN":
                return "bg-blue-500";

            case "IN_PROGRESS":
                return "bg-yellow-500";

            case "CLOSED":
                return "bg-green-600";

            default:
                return "bg-gray-500";

        }

    };

    return (

        <UserLayout>

            <div className="max-w-6xl mx-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">
                            🎫 My Support Tickets
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track your submitted support requests.
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button
                            onClick={loadTickets}
                            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                            Refresh
                        </button>

                        <button
                            onClick={() => navigate("/user/support/create")}
                            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                            + Create New Ticket
                        </button>

                    </div>

                </div>

                {

                    tickets.length === 0 ?

                        (

                            <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                                <h2 className="text-2xl font-semibold">
                                    No Support Tickets
                                </h2>

                                <p className="text-gray-500 mt-3">
                                    You haven't created any support tickets yet.
                                </p>

                                <button
                                    onClick={() => navigate("/user/support/create")}
                                    className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Create Your First Ticket
                                </button>

                            </div>

                        )

                        :

                        (

                            <div className="space-y-5">

                                {

                                    tickets.map(ticket => (

                                        <div
                                            key={ticket.id}
                                            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                        >

                                            <div className="flex justify-between items-center">

                                                <div>

                                                    <h2 className="text-xl font-bold">
                                                        {ticket.subject}
                                                    </h2>

                                                    <p className="text-gray-500">
                                                        {ticket.category}
                                                    </p>

                                                </div>

                                                <span
                                                    className={`${getStatusColor(ticket.status)} text-white px-4 py-1 rounded-full text-sm`}
                                                >
                                                    {ticket.status}
                                                </span>

                                            </div>

                                            <hr className="my-4" />

                                            <p>
                                                <strong>Description:</strong>
                                            </p>

                                            <p className="text-gray-700 mt-2">
                                                {ticket.description}
                                            </p>

                                            <div className="mt-5">

                                                <strong>
                                                    Admin Reply
                                                </strong>

                                                <div className="mt-2 bg-gray-100 rounded-lg p-4">

                                                    {

                                                        ticket.adminReply ?

                                                            ticket.adminReply

                                                            :

                                                            <span className="text-gray-500 italic">
                                                                Waiting for admin response...
                                                            </span>

                                                    }

                                                </div>

                                            </div>

                                            <div className="mt-5 text-sm text-gray-500">

                                                Created on

                                                {" "}

                                                {

                                                    new Date(ticket.createdAt)
                                                        .toLocaleString()

                                                }

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </UserLayout>

    );

}

export default MyTickets;
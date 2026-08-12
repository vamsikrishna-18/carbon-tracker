import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
    getAllTickets,
    replyTicket,
    updateStatus
} from "../../services/supportService";

function AdminSupport() {

    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [reply, setReply] = useState("");

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await getAllTickets();
            setTickets(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const sendReply = async () => {

    if (!reply.trim()) {
        alert("Reply cannot be empty");
        return;
    }

    try {

        const response = await replyTicket(selectedTicket.id, reply);

        alert("Reply sent successfully");

        setSelectedTicket(response.data);

        setReply(response.data.adminReply);

        loadTickets();

    } catch (error) {

        console.error(error);

        alert("Failed to send reply");

    }

};

    const changeStatus = async (ticketId, status) => {

    try {

        const response = await updateStatus(ticketId, status);

        setSelectedTicket(response.data);

        loadTickets();

    } catch (error) {

        console.error(error);

        alert("Failed to update status");

    }

};

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">
                Support Tickets
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {/* Ticket List */}

                <div className="col-span-1 bg-white rounded-xl shadow p-5">

                    <h2 className="text-xl font-semibold mb-4">
                        Tickets
                    </h2>

                    {

                        tickets.map(ticket => (

                            <div
                                key={ticket.id}
                                onClick={() => {
                                    setSelectedTicket(ticket);
                                    setReply(ticket.adminReply || "");
                                }}
                                className="border rounded-lg p-4 mb-3 cursor-pointer hover:bg-gray-100"
                            >

                                <h3 className="font-semibold">
                                    {ticket.subject}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {ticket.userName}
                                </p>

                                <span className="text-xs text-blue-600">
                                    {ticket.status}
                                </span>

                            </div>

                        ))

                    }

                </div>

                {/* Ticket Details */}

                <div className="col-span-2 bg-white rounded-xl shadow p-6">

                    {

                        selectedTicket ?

                            (

                                <>

                                    <h2 className="text-2xl font-bold">
                                        {selectedTicket.subject}
                                    </h2>

                                    <p className="mt-4">
                                        <strong>User:</strong> {selectedTicket.userName}
                                    </p>

                                    <p className="mt-2">
                                        <strong>Category:</strong> {selectedTicket.category}
                                    </p>

                                    <p className="mt-2">
                                        <strong>Description:</strong>
                                    </p>

                                    <div className="bg-gray-100 rounded-lg p-4 mt-2">
                                        {selectedTicket.description}
                                    </div>

                                    <div className="mt-6">

                                        <label className="font-semibold">
                                            Admin Reply
                                        </label>

                                        <textarea
                                            rows={5}
                                            className="w-full border rounded-lg mt-2 p-3"
                                            value={reply}
                                            onChange={(e) =>
                                                setReply(e.target.value)
                                            }
                                        />

                                        <button
                                            onClick={sendReply}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                                        >
                                            Send Reply
                                        </button>

                                    </div>

                                    <div className="mt-8">

                                        <label className="font-semibold">
                                            Status
                                        </label>

                                        <select
                                            className="border rounded-lg ml-4 p-2"
                                            value={selectedTicket.status}
                                            onChange={(e) => {

                                                changeStatus(
                                                    selectedTicket.id,
                                                    e.target.value
                                                );

                                                setSelectedTicket({
                                                    ...selectedTicket,
                                                    status: e.target.value
                                                });

                                            }}
                                        >

                                            <option value="OPEN">OPEN</option>
                                            <option value="IN_PROGRESS">
                                                IN_PROGRESS
                                            </option>
                                            <option value="CLOSED">
                                                CLOSED
                                            </option>

                                        </select>

                                    </div>

                                </>

                            )

                            :

                            (

                                <div className="flex justify-center items-center h-full text-gray-500 text-xl">

                                    Select a ticket to view details

                                </div>

                            )

                    }

                </div>

            </div>

        </AdminLayout>

    );

}

export default AdminSupport;
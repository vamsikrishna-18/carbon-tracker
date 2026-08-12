import { useState } from "react";
import { createTicket } from "../services/supportService";
import { useNavigate } from "react-router-dom";
function CreateTicket() {
    const navigate = useNavigate();

    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Get logged-in user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
            alert("Please login again.");
            return;
        }

        try {

            const request = {
                userId: user.id,
                subject: subject,
                category: category,
                description: description
            };

            console.log("Sending Request:", request);

            await createTicket(request);

           alert("Support ticket created successfully!");

navigate("/dashboard");

        } catch (error) {

            console.error("Create Ticket Error:", error);

            if (error.response) {
                console.log("Backend Response:", error.response.data);
            }

            alert("Failed to create ticket");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
                Create Support Ticket
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="font-medium">
                        Subject
                    </label>

                    <input
                        type="text"
                        className="w-full border rounded-lg p-3 mt-2"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="font-medium">
                        Category
                    </label>

                    <select
                        className="w-full border rounded-lg p-3 mt-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Bug">Bug</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Account">Account</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="font-medium">
                        Description
                    </label>

                    <textarea
                        rows="6"
                        className="w-full border rounded-lg p-3 mt-2"
                        placeholder="Describe your issue..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                    Submit Ticket
                </button>

            </form>

        </div>
    );
}

export default CreateTicket;
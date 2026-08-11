import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import {
    getNotifications,
    markAsRead,
    markAllAsRead
} from "../services/notificationService";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {

        const response = await getNotifications(user.id);

        setNotifications(response.data);

    };

    const readNotification = async (id) => {

        await markAsRead(id);

        loadNotifications();

    };

    const readAll = async () => {

        await markAllAsRead(user.id);

        loadNotifications();

    };

    return (

        <UserLayout>

            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold">
                        Notifications
                    </h1>

                    <button
                        onClick={readAll}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        Mark All Read
                    </button>

                </div>

                {

                    notifications.length === 0 ?

                        (

                            <div className="bg-white rounded-xl shadow p-8 text-center">

                                No Notifications

                            </div>

                        )

                        :

                        (

                            notifications.map(notification => (

                                <div
                                    key={notification.id}
                                    onClick={() =>
                                        readNotification(notification.id)
                                    }
                                    className={`rounded-xl shadow p-5 mb-4 cursor-pointer ${
                                        notification.isRead
                                            ? "bg-white"
                                            : "bg-green-50 border-l-4 border-green-600"
                                    }`}
                                >

                                    <h2 className="font-bold text-lg">
                                        {notification.title}
                                    </h2>

                                    <p className="mt-2">
                                        {notification.message}
                                    </p>

                                    <p className="text-gray-500 mt-3 text-sm">

                                        {

                                            new Date(
                                                notification.createdAt
                                            ).toLocaleString()

                                        }

                                    </p>

                                </div>

                            ))

                        )

                }

            </div>

        </UserLayout>

    );

}

export default Notifications;
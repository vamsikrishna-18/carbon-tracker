import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GoogleSuccess() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const id = searchParams.get("id");
        const name = searchParams.get("name");
        const email = searchParams.get("email");
        const role = searchParams.get("role");

        console.log("========== GOOGLE LOGIN SUCCESS ==========");
        console.log("ID:", id);
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Role:", role);


        // Make sure required data exists
        if (!id || !email || !role) {

            console.error(
                "Google login data is missing"
            );

            navigate("/login");
            return;
        }


        // Create the same user structure
        // used by your normal login
        const user = {
            id: Number(id),
            fullName: name,
            email: email,
            role: role
        };


        // Store user information
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "userId",
            String(id)
        );

        localStorage.setItem(
            "role",
            role
        );


        // Redirect according to role
        if (role === "ADMIN") {

            navigate("/admin/dashboard");

        } else {

            navigate("/dashboard");
        }

    }, [navigate, searchParams]);


    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="text-center">

                <div className="text-4xl mb-4">
                    🔐
                </div>

                <h2 className="text-xl font-semibold">
                    Signing you in...
                </h2>

                <p className="text-gray-500 mt-2">
                    Completing Google authentication...
                </p>

            </div>

        </div>
    );
}

export default GoogleSuccess;

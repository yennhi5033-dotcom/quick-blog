import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from "@/services/authService";

export const Login = () => {
    // 1. Tạo state: email, password, loading, error
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    // 2. Xử lý khi submit form Login:
    const handleLogin = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setError(""); 

        try {
            const res = await loginUser(email, password);
            localStorage.setItem("token", res.data); 
            window.location.href = "/";
        } catch (error) {
            setError("Sai email hoặc mật khẩu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <main className="grid min-h-screen place-items-center bg-[linear-gradient(120deg,#070724_0%,#5947f0_48%,#05c7df_100%)] px-4 py-10">
                <form 
                    className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl"
                    onSubmit={handleLogin} 
                >
                    <img
                        alt="QuickBlog"
                        className="mx-auto mb-8 h-16"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF30lEQVR4nO2cT2hcRRzHfzVqbZKd2STWWI3SelIUFeqhhUIOGvOG/JtJeeBBGuyhHgSLf0BFJLn4J5nZxD2o1JP0GE9a9FAREXqzIAppiyRElNjavkkaKzYNSZ5M1nRTs2nzdt+bmd15X5jjJr/5fmZ+v9/75W0AUqVKlSqVswqATAdAjknw/D+hvdF0PM5JAgmLy/tHAvkmAHJUwrMPmI7NQQAb1kQA5IMAOp8JYe8dpmN1EcD1FQAJJJDxAMihy9DVZDpu5wDcCMNbkuCdlkCGLkHX3hBgm+l9OAWgxO1IC7lJAGkhtwrAzQp5++2VxFqT0gAgLeS2AEgLuUUAStyOaScLuWnjpeuFvLBJtVnvmnnjyWbp6kcJ3rsSOveH4NdBLWoGuutnwesppAEyY9p06XIhD2HwNlUYJXhvBOCdCoCsWHozlpwo5Begp1WdOHXyJJArFt+O6Zov5L+Bv0M9VEkgeQnkd9Omy2ov5I394uFKPi+h89FiqvKWzRtPkkp3v85Bxx6IW5iJEDMxgRkfaqRjj1Tys/4Cb+e6VDVv2jRZDRD+A7B+xQJDzX1mwTug5kASyDnT5klbIZQAEDsMpcvQ9VDxmYMsmjZS2gLhFgASgTEPT7eoTkWCdzwAb85pCBEAJAIjBL9uXaqacA5CmQASgbGWqiR4RwLwTtg8HokNQgwAEoNxHjoaiuMR73xNQogZQGIwQvDrCuMRMqTGD7aNR8qGkCCAxGAozUHn7mKqIgtVC0ETgERhzFg0yY0MwQCARGFsHI/oT1WRIBgGECYNoxyp4V0AZFILBMTEO4jxny0AEK4tFY+Kq9JBYdVAUMI9fE+WiqOYilOmAWBLboZ2CGtKYVgAYU0pDDAPYU0qJ9tcM3APj/8PJrZBsPdm8AXcN/JklD2oAWBVQ7ALBn8latwFQ2oEglEYlJ8ECCO/klI0pMYg6IXBL9Wz0V3lxHejIdEgzEL3gwF4UxVCmAJdSgpGlonecmPaaIj+mwAmFBsMKj6qJI7Sp1IvBDCpNj+3AzMxWSaACfX5Sn7/5qlBHwQwKcz4x7pazlK6eX7WAwFMKUM5wYyv6Go5S+nWRTJ6Ya4KAA2M34MZv6Cz5SylrXUqUW+C9QDCbZjyr3S3nKW09XZx6xCsB4CpeNVEy1lKUYzaKgSrATQx/him4qqJljPVwOBd5U9R+Zld3YP1prdQ1TLdcjotG1pOZ2VLy+mo7Gk5nZRNLacOtfQOZyJ2dtcSC8bFljPLck9ETLEymUgcbTkR5W9F2Sui4qdEAsFMfOJay9nawRsw5X9EBPB57IG42nIiJj6LvN9+/lqsQTjZcg6odCs+LWvP8d52t1rORj+/E1NxBFPxS3l7FpOxBlTrLWdL7/B9GcZfRkx8FzXXb5L/34wtuFptORt6PmxFTLyEqPgeU7FcqenXzWd8Hvm55niirLGWs7Fb3I1Y7kVExbeY8qW4TP/f6X87toBroeXEXe83ZVnuEGb8BKZ8MQnTizeen1WHFlxvOXHfWDZL+QBm4uvETS+m26vo4OhTseXHams5m708ytDc84iJL1dvoA7TiwduRQF3tuXM0JH9ZTcKlaedJcz4C7FtRj3BVVPL2abewKP8rCHzFxHjz4HLQpRzE+YjxqczLLcPXFZmNfUk007eJM0uICZG1IAOXFab7tRD+UV125r93P2m9+5E6kGUX1Gv2CMqRlG/6AR/8E7Te7ZGGZbbl0jqofwipuJ4to/3gJffbnqfdsrLby98jzg206cwFfkmKg5of37BTBzTW8CE+VUYvJ02/s9DsjTXXv6oocoW5UuI8i8wFYfVrB/suMb8jHFjmJ6FGB8Gm4SZeM+0KVjfOlfp981iVfbgyOPaJoTM8KJiuVBcbZE/Xocp/8G4Mczd1PO6aVOwq6kH943tRkz8bYExoXuppzDjP2ncGOZq6qHisGlTsKupp94fuVe9qWuBMaGDqWf1+1vjxo1hepaa05v2O1WqVKlSpUqVCpzXv6Tcu8oOh42gAAAAAElFTkSuQmCC"
                    />

                    {/* Hiển thị lỗi ra màn hình nếu có */}
                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <input 
                            className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-950"
                            placeholder="Enter your email"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-indigo-950"
                            placeholder="Enter your password"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-60 bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-10 px-4 w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                    <p className="mt-8 text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-semibold text-indigo-600">
                            Signup
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    );
}
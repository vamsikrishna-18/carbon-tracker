import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const createTicket = (data) =>
    axios.post(`${API}/support/create`, data);

export const getUserTickets = (userId) =>
    axios.get(`${API}/support/user/${userId}`);

export const getTicket = (ticketId) =>
    axios.get(`${API}/support/${ticketId}`);

export const getAllTickets = () =>
    axios.get(`${API}/admin/support`);

export const replyTicket = (ticketId, reply) =>
    axios.put(`${API}/admin/support/reply/${ticketId}`, reply, {
        headers: {
            "Content-Type": "text/plain"
        }
    });

export const updateStatus = (ticketId, status) =>
    axios.put(
        `${API}/admin/support/status/${ticketId}?status=${status}`
    );

export const deleteTicket = (ticketId) =>
    axios.delete(`${API}/admin/support/${ticketId}`);
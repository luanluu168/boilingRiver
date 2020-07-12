import React from 'react';

let today = new Date();
const Footer = () => {
    let currentYear = today ? today.getFullYear() : 2020;
    return (
        <div className="pt-5">
            <div className="text-center bg-dark text-white-50 py-2 footer">
                &copy; {currentYear} All right reserved
            </div>
        </div>
    )
};

export default Footer;
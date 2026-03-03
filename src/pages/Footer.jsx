
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <footer className="bg-black text-white mt-16 rounded">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10 text-center md:text-left">

          {/* Logo + Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Paris Restaurant</h2>
            <p className="text-gray-400 text-sm">
              Best quality food with fast service and great taste.
            </p>
          </div>

          {/* Delivery Info */}
          <div>
            <h3 className="font-semibold mb-3">Delivery</h3>
            <p className="text-gray-400 text-sm">
              🚚 Free delivery available in local areas.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              🍔 Partner: Zomato Delivery Service
            </p>
          </div>
          {/* Call to Order */}
<div className="text-center">

  <h3 className="font-semibold mb-3">Call to Order</h3>

  <div className="flex flex-col items-center space-y-3 text-sm">

    <a
      href="tel:+918232460758"
      className="flex items-center gap-2 hover:text-green-400 transition"
    >
      <FontAwesomeIcon icon={faPhone} />
      +91 82324 60758
    </a>

    <a
      href="tel:+918232460758"
      className="flex items-center gap-2 hover:text-green-400 transition"
    >
      <FontAwesomeIcon icon={faPhone} />
      +91 82324 60758
    </a>

  </div>

</div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-3">Location</h3>
            <p className="text-gray-400 text-sm">
              📍 ASHOK NAGAR,
            OPPOSITE SANJEEVINI MEDICALS 
              DOUBLE ROAD MANDYA 571401
            </p>
          </div>

          {/* Social Links */}
          {/* Social Links */}
<div>
  <h3 className="font-semibold mb-3">Contact Us</h3>

  <div className="flex justify-center md:justify-start gap-6 text-2xl">

    {/* WhatsApp */}
    <a
      href="https://wa.me/message/7J72YG53XWX6K1?src=qr"
      target="_blank"
      rel="noreferrer"
      className="hover:text-green-400 transition"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/paris__restaurant?igsh=OHkwZnIzamZ3dG0y&utm_source=qr"
      target="_blank"
      rel="noreferrer"
      className="hover:text-pink-400 transition"
    >
      <FontAwesomeIcon icon={faInstagram} />
    </a>

  </div>
  <div>
    <p></p>
  </div>
</div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-10 border-t border-gray-800 pt-6 text-gray-500 text-sm">
          © 2026 Paris Restaurant. All Rights Reserved.MUV
        </div>

      </div>

    </footer>
  );
}

export default Footer;
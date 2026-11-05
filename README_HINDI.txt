URBAN HUNGER PWA — MOBILE SETUP

Is package mein:
- Mobile-friendly food menu + category filters
- Cart, quantity controls, subtotal
- Checkout form: customer name, phone, pickup/delivery, address
- COD / UPI selection
- WhatsApp order handoff
- PWA manifest + service worker (installable app support)

IMPORTANT: Ye pehla frontend/PWA version hai, production backend nahi.
Orders WhatsApp par draft ke roop mein bheje jaate hain. Shop ko WhatsApp par order confirm karna hoga.
Database, owner login/admin dashboard, live order status, automatic payment verification, inventory aur delivery fee rules abhi included nahi hain.

PUBLISH KARNE SE PEHLE:
1. GitHub par apni repository mein saari files upload karo.
2. config.js kholo aur:
   shopWhatsApp: "ADD_YOUR_WHATSAPP_NUMBER"
   ko apne shop ke WhatsApp number se replace karo. India number format: 91XXXXXXXXXX
3. UPI ID ko sirf tab add karo jab woh tumhara verified shop UPI ID ho:
   upiId: "yourshop@upi"
4. app.js mein menu names/prices ko apne actual menu aur cost ke hisaab se verify/update karo.
5. GitHub Pages enable karo (Settings > Pages > Deploy from branch > main > /(root)).
6. HTTPS par open karke Android Chrome menu > Add to Home screen / Install app karo.

OWNERSHIP:
- GitHub account, repository, domain registrar account apne email par rakho.
- 2FA on karo, recovery codes safe jagah rakho.
- Password, OTP, UPI PIN kisi ko mat do.
- Public GitHub repository mein source code sabko dikhega; secrets kabhi code mein mat rakho.
- Real customer information ko public repo mein kabhi save mat karo.

MENU STARTER PRICES:
Sample values only. Shop ke actual prices aur item availability se replace karo.

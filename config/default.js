module.exports = {
    app: {
        port: 3000,
        static_folder: `${__dirname}/../src/public`,
        router: `${__dirname}/../src/routers/web`,
        view_folder: `${__dirname}/../src/apps/views`,
        view_engine: "ejs",
        session_key: "Vietpro_session",
    },
    mail:{
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "kinhdoanh.deevisco@gmail.com",
            pass: "cdzd jcra hkeb abiq",
        },
    }
}
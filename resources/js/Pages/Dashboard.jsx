import Layout from "@/Layouts/Layout.jsx";

const Dashboard = ({permisos}) => {
    return (
        <Layout permisos={permisos}>
            <div className="grid">
                <div className="col-12 xl:col-12">
                    <div className="card d-flex justify-content-center align-items-center flex-column">
                        <img src="assets/image/imprenta.jpg" alt="Imprenta" style={{ width: '600px', height: 'auto', display: 'block', margin: 'auto' }}/>
                        <h1 style={{ textAlign: 'center' }}>IMPRENTA UNSXX</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
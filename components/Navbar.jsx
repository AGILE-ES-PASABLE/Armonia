import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/enterprise">Organización</Link></li>
                <li><Link href="/survey">Cuestionarios</Link></li>
                <li><Link href="/reportes">Reportes</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

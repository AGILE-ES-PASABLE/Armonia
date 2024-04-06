import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/enterprise">Organización</Link></li>
                <li><Link href="/cuestionarios">Cuestionarios</Link></li>
                <li><Link href="/mediciones">Mediciones</Link></li>
                <li><Link href="/reportes">Reportes</Link></li>
                <li><Link href="/pda">PDA</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

import Link from 'next/link'
import classes from './sidebarMenu.module.css'

const SubNavList = ({ title, link }) => {

	return (
		<>
			<li className={classes.navLink1}>
				<Link href={`/${link}`}>
				<a href="" className='text-green-600'>{title}</a>
				</Link>
			</li>
		</>
	)
}

export default SubNavList;
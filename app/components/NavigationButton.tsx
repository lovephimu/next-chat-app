import { Route } from 'next';
import Link from 'next/link';

type Props = {
  iconComponent: React.ComponentType;
  route: string;
};

export default function NavigationButton(props: Props) {
  const IconComponent = props.iconComponent;
  return (
    <Link href={`/${props.route}` as Route}>
      <div className="border border-primaryPink m-8 p-2 rounded-xl opacity-0 md:opacity-100 transition duration-500 hover:border-pink-400 statistics-logo">
        <IconComponent />
      </div>
    </Link>
  );
}

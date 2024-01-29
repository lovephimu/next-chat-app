import { Route } from 'next';
import Link from 'next/link';

type Props = {
  iconComponent: React.ComponentType;
  route: string;
  title: string;
};

export default function NavigationButton(props: Props) {
  const IconComponent = props.iconComponent;
  return (
    <Link href={`/${props.route}` as Route} title={props.title}>
      <div className="sm:border border-primaryPink m-4 sm:m-8 sm:p-2 rounded-xl md:opacity-100 transition duration-500 hover:border-pink-400 statistics-logo max-w-16">
        <IconComponent />
      </div>
    </Link>
  );
}

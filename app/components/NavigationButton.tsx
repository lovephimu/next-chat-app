type Props = {
  iconComponent: React.ComponentType;
};

export default function NavigationButton(props: Props) {
  const IconComponent = props.iconComponent;
  return (
    <div className="border border-primaryPink m-8 p-2 rounded-xl opacity-0 md:opacity-100 transition-opacity duration-500">
      <IconComponent />
    </div>
  );
}

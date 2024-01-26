type Props = {
  function: () => Promise<void>;
  isBlocked: boolean;
  title: string;
};

export default function InputButton(props: Props) {
  return (
    <div className="flex justify-center w-20">
      <button
        className={props.isBlocked ? 'text-gray-300' : ''}
        onClick={async () => await props.function()}
      >
        {props.title}
      </button>
    </div>
  );
}

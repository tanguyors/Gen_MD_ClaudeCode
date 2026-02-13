interface FieldGroupProps {
  children: React.ReactNode;
  label?: string;
}

export function FieldGroup({ children, label }: FieldGroupProps) {
  return (
    <fieldset className="space-y-4">
      {label && (
        <legend className="text-sm font-semibold text-gray-800 mb-2">{label}</legend>
      )}
      {children}
    </fieldset>
  );
}

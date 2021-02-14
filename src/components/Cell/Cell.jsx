import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';

export default function Cell() {
  return (
    <Editable defaultValue="123" borderColor="gray.600" borderWidth="1px">
      <EditablePreview w="100%" pl="2" />
      <EditableInput borderRadius="0" pl="2" />
    </Editable>
  );
}

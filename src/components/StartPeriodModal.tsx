import { Component, For, createSignal, createEffect } from 'solid-js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
  Button,
  SimpleSelect,
  SimpleOption,
} from '@hope-ui/solid';

import { nanoid } from 'nanoid';
import { useAppData } from '@app/context';
import { startClassPeriod } from '@app/db/classPeriod';

interface Props {
  isOpen: boolean
  onClose: () => void
}
const StartPeriodModal: Component<Props> = (props) => {
  const [periodId, setPeriodId] = createSignal<string | null>(null);
  const { appState } = useAppData();

  createEffect(() => {
    if (appState.periods.length > 0) {
      setPeriodId(appState.periods[0].id);
    }
  });

  const onCreate = () => {
    const period = appState.periods.find(p => p.id === periodId());
    if (period === undefined || appState.selectedClass === null) return;
    const date = new Date().toISOString();
    startClassPeriod({
      id: nanoid(),
      finished: false,
      start: date,
      end: date,
      period: { id: period.id, name: period.name },
      class_id: appState.selectedClass.id,
    }).then(() => {
      props.onClose();
    }).catch((err) => {
      // TODO: handle fatal error
      console.log('Error: ', err);
    });
  };

  return (
    <Modal centered opened={props.isOpen} onClose={() => props.onClose()} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Iniciar nuevo periodo</ModalHeader>
        <ModalBody>
          <Flex flexDirection="column">
            <Text>
              Periodo:
            </Text>
            <SimpleSelect value={periodId()} onChange={setPeriodId}>
              <For each={appState.periods}>
                {(period) => (
                  <SimpleOption value={period.id}>
                    {period.name}
                  </SimpleOption>
                )}
              </For>
            </SimpleSelect>
            <Text size="sm" mt="$2">
              Un periodo (trimestre, bimestre, etc.) representa un lapso en el cual se realizan actividades, se toma asistencia y se obtiene una nota final.
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="neutral" size="sm" mr="$2" onClick={() => props.onClose()}>
            Cancelar
          </Button>
          <Button colorScheme="success" size="sm" onClick={onCreate}>
            Iniciar periodo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StartPeriodModal;
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';
import { Icon, HelpCircleIcon, CloseIcon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { InterfaceToastProps, ToastPlacement } from '@gluestack-ui/toast/lib/types';

type ActionType = 'error' | 'muted' | 'warning' | 'success' | 'info';

export const showToast = ({
  toast,
  toastId,
  content,
  actionType = 'error',
  position = 'bottom',
}: {
  toast: {
    show: (props: InterfaceToastProps) => string;
    close: (id: string) => void;
    closeAll: () => void;
    isActive: (id: string) => boolean;
  };
  toastId: string;
  content: string;
  actionType?: ActionType;
  position?: ToastPlacement;
}) => {
  toast.show({
    id: toastId,
    placement: position,
    duration: 3000,
    render: ({ id }: { id: string }) => {
      const uniqueToastId = 'toast-' + id;
      return (
        <Toast
          action={actionType}
          variant="outline"
          nativeID={uniqueToastId}
          className="p-4 gap-6 border-error-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
        >
          <HStack space="md">
            <Icon as={HelpCircleIcon} className="stroke-error-500 mt-0.5" />
            <VStack space="xs">
              <ToastTitle className="font-semibold text-error-500">Error!</ToastTitle>
              <ToastDescription size="sm">{content}</ToastDescription>
            </VStack>
          </HStack>
          <Pressable onPress={() => toast.close(id)}>
            <Icon as={CloseIcon} />
          </Pressable>
        </Toast>
      );
    },
  });
};

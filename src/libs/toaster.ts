import { toast } from "react-toastify";
class NotificationService {
  public success(msg: string) {
    toast.success(msg);
  }

  public error(msg: any) {
    const str = JSON.stringify(msg);
    toast.error(str);
  }
}

const toaster = new NotificationService();
export default toaster;

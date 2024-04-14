import { defineStore } from "pinia";
import { ref } from "vue";

export const usePopupStore = defineStore("PopupStore", {
  state: () => ({
    showPopup: ref(false),
    popupType: ref(""),
    popupMessage: ref(""),
  }),
  actions: {
    successPopup(message) {
      this.showPopup = true;
      this.popupType = "success";
      this.popupMessage = message;
      this.setAutoClose();
    },
    errorPopup(message) {
      this.showPopup = true;
      this.popupType = "error";
      this.popupMessage = message;
      this.setAutoClose();
    },
    closePopup() {
      this.showPopup = false;
      this.popupType = "";
      this.popupMessage = "";
    },
    setAutoClose() {
      setTimeout(() => {
        this.closePopup();
      }, 5000);
    },
  },
});

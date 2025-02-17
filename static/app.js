class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => this.toggleState(chatBox));

    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");

    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatBox) {
    this.state = !this.state;

    //show or hides the box
    if (this.state) {
      chatBox.classList.add("chatbox--active");
    } else {
      chatBox.classList.remove("chatbox--active");
    }
  }

  onSendButton(chatbox) {
    var textField = chatbox.querySelector("input");
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    fetch($SCRIPT_ROOT + "/predict", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.answer) {
          // Ensure "answer" exists
          let msg2 = { name: "Chathuranga", message: r.answer }; // Fix "message" key
          this.messages.push(msg2);
        } else {
          let msg2 = { name: "Chathuranga", message: "Error: No response" };
          this.messages.push(msg2);
        }
        this.updateChatText(chatbox);
        textField.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        let msg2 = {
          name: "Chathuranga",
          message: "Error occurred while fetching response",
        };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item) {
        if (item.name === "Chathuranga") {
          html +=
            '<div class="messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}

const chatbox = new Chatbox();
chatbox.display();

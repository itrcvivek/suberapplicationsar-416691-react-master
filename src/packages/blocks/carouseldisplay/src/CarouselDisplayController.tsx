import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { slider1, slider2, slider3 } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  index: number;
  imgData: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CarouselDisplayController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  swiper: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End
    this.subScribedMessages = [
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      index: 0,
      imgData: [
        {
          id: 1,
          img: slider1,
        },
        {
          id: 2,
          img: slider2,
        },
        {
          id: 3,
          img: slider3,
        },
      ],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start
  thumbnailControl = (index: number) => {
    let currentIndex = this.state.index;
    if (currentIndex !== index) {
      let resultSlide = 0;
      let countSlides = this.state.imgData.length;

      if (index > currentIndex && index !== countSlides) {
        resultSlide = index - currentIndex;
      } else if (index > currentIndex && index === countSlides) {
        resultSlide = currentIndex + 1;
      } else if (index < currentIndex && index !== 0) {
        resultSlide = (currentIndex - index) * -1;
      } else if (index < currentIndex && index === 0) {
        resultSlide = currentIndex * -1;
      }
      this.swiper.scrollBy(resultSlide, true);
    }
  };
  // Customizable Area End
}

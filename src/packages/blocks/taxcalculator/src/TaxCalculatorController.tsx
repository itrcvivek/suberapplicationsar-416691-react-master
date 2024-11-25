// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export interface CountryObj {
  id: number;
  name: string;
  value: string;
}

interface CountryRes {
  data: CountryObj[];
}

interface ProductTypeAttr {
  id: number;
  name: string;
  tax_rate: string;
}

export interface ProductTypeObj {
  value: string;
  id: string;
  type: string;
  attributes: ProductTypeAttr;
}

interface ProctTypeRes {
  data: ProductTypeObj[];
}

const productTypeData = {
  data: [
    {
      id: "2",
      value: "Garments",
      type: "product_types",
      attributes: {
        id: 2,
        name: "Garments",
        tax_rate: "0.0",
        created_at: "2023-04-19T15:43:37.366Z",
        updated_at: "2023-04-19T15:43:37.366Z",
      },
    },
  ],
};
const countryData = [
  {
    id: 230,
    value: "Afghanistan",
    name: "Afghanistan",
    country_code: "AF",
    created_at: "2023-04-19T15:09:39.014Z",
    updated_at: "2023-04-19T15:09:39.014Z",
  },
];

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  isLoading: boolean;
  productTypeData: ProductTypeObj[];
  price: string;
  priceErr: string;
  selectedProductType: ProductTypeObj | undefined;
  productTypeErr: string;
  selectedCountry: CountryObj | undefined;
  countryData: CountryObj[];
  countryErr: string;
  productName: string;
  productNameErr: string;
  taxDataRes: { price: number };
  token: string;
  errorMessage: string;
}

interface SS {
  id: any;
}

export default class TaxCalculatorController extends BlockComponent<
  Props,
  S,
  SS
> {
  getContriesId: string;
  getProductTypeId: string;
  calculateTaxApiId: string;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.getContriesId = "";
    this.getProductTypeId = "";
    this.calculateTaxApiId = "";
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.SessionResponseToken),
      getName(MessageEnum.SessionRequestMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      isLoading: false,
      productTypeData: productTypeData.data,
      price: "",
      priceErr: "",
      selectedProductType: undefined,
      productTypeErr: "",
      selectedCountry: undefined,
      countryData: countryData,
      countryErr: "",
      productName: "",
      productNameErr: "",
      taxDataRes: { price: 0 },
      token: "",
      errorMessage: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      if (token) {
        this.setState({ token: token, errorMessage: "" }, () => {
          this.getProductType();
        });
      } else {
        this.setState({ errorMessage: "Please Login First" });
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      this.handleResponse(apiRequestCallId, message);
    }
  }

  async componentDidMount() {
    this.getToken();
    await this.getProductType();
    this.getCountries();
  }

  getToken = () => {
    const msgTxt: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgTxt);
  };

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  handleResponse = (apiRequestCallId: string, message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (apiRequestCallId && responseJson) {
      if (!responseJson.errors) {
        switch (apiRequestCallId) {
          case this.getContriesId:
            this.countryListResponse(responseJson);
            break;
          case this.getProductTypeId:
            this.productTypeListRes(responseJson);
            break;
          case this.calculateTaxApiId:
            this.setState({ taxDataRes: responseJson });
            break;
          default:
            break;
        }
        this.setState({ errorMessage: "" });
      } else if (responseJson.errors) {
        if (this.isPlatformWeb()) {
          this.setState({
            errorMessage: JSON.stringify(responseJson.errors[0]),
          });
        } else {
          this.showAlert("", JSON.stringify(responseJson.errors[0]));
        }
      }
    } else if (errorReponse) {
      this.hideLoader();
    }
  };

  countryListResponse = (responseJson: CountryRes) => {
    if (responseJson.data) {
      let newCountryArray = [];
      for (const element of responseJson.data) {
        element.value = element?.name;
        newCountryArray.push(element);
      }

      this.setState({ countryData: newCountryArray });
    }
  };

  productTypeListRes = (responseJson: ProctTypeRes) => {
    if (responseJson.data) {
      let productTypeListResArray = [];
      for (const element of responseJson.data) {
        element.value = element?.attributes?.name;
        productTypeListResArray.push(element);
      }
      this.setState({ productTypeData: productTypeListResArray });
    }
  };

  getCountries = () => {
    this.showLoader();

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getContriesId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.countryListApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getProductType = async () => {
    this.showLoader();
    if (!this.state.token) {
      return;
    }
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductTypeId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productTypeListApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onChangePrice = (productPrice: string) => {
    const priceRegx = /^(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:.\d{1,12})?$/;
    if (priceRegx.test(productPrice) && Number(productPrice) > 0) {
      this.setState({ price: productPrice, priceErr: "" }, () =>
        this.checkvalues()
      );
    } else {
      this.setState({ price: productPrice, priceErr: configJSON.priceError });
    }
  };

  onChangeProductName = (productName: string) => {
    const addressRegx = /^[.0-9a-zA-Z\s,-]+$/;
    if (addressRegx.test(productName)) {
      this.setState({ productName: productName, productNameErr: "" }, () => {
        this.checkvalues();
      });
    } else {
      this.setState({
        productName: productName,
        productNameErr: configJSON.productNameError,
      });
    }
  };

  onchangePType = (productTypevalue: string, productData: ProductTypeObj[]) => {
    const productItem = productData?.find(
      (productDataItem: ProductTypeObj) =>
        productDataItem?.attributes?.name == productTypevalue
    );
    this.setState(
      { selectedProductType: productItem, productTypeErr: "" },
      () => this.checkvalues()
    );
  };

  onchangeCountry = (Countryvalue: string, countryData: CountryObj[]) => {
    const countryItem = countryData?.find(
      (CountryDataItem: CountryObj) => CountryDataItem?.name == Countryvalue
    );
    this.setState({ selectedCountry: countryItem, countryErr: "" }, () =>
      this.checkvalues()
    );
  };

  checkValidations = async () => {
    if (!this.state.selectedCountry) {
      this.setState({ countryErr: configJSON.countryError });
    }
    if (!this.state.price) {
      this.setState({ priceErr: configJSON.priceError });
      return;
    }
    if (!this.state.selectedProductType) {
      this.setState({ productTypeErr: configJSON.productTypeError });
      return;
    }
    if (!this.state.productName) {
      this.setState({ productNameErr: configJSON.productNameError });
    }
  };

  checkvalues = async () => {
    const { selectedCountry, selectedProductType, price, productName } =
      this.state;
    if (selectedCountry && selectedProductType && price && productName) {
      this.apiTaxCalculator();
    } else {
      await this.checkValidations();
    }
  };

  apiTaxCalculator = () => {
    this.showLoader();
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    let product_type_id = this.state.selectedProductType?.attributes?.id;
    let price = this.state.price;
    let country_id = this.state.selectedCountry?.id;

    let params = "";
    if (product_type_id && price && country_id) {
      params = `?category_id=${product_type_id}&price=${price}&country_id=${country_id}`;
    }

    this.calculateTaxApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.calculateTaxApi + params
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
}

// Customizable Area End

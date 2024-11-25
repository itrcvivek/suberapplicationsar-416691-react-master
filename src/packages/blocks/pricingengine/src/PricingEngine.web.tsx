import React , {CSSProperties} from "react";
import PricingEngineController, { Props, IProductItem } from "./PricingEngineController";
import { Container, Grid, CardActionArea, Card, CardMedia, CardContent, Typography, Checkbox, Button } from '@material-ui/core'
// Customizable Area Start
// Customizable Area End

export default class PricingEngine extends PricingEngineController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End

  render() {

    return (
      // Customizable Area Start
      <div style={bodybg}> 
        <Container >
          <Grid container spacing={3} style={grid_style}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => {
                this.submit(this.state.productCount);
              }}>
                Add To Cart
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={grid_style} id='product_grid'> 
            {
              this.state.productList.map((item: IProductItem, index: number) => {
                return (
                  <Grid item sm={3} id={"grid_item"+index.toString()}>
                    <Card className=''>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="160"
                          image={item.product_image}
                        />
                        <Checkbox
                          color="default"
                          name={item.id}
                          value={item.id}
                          size="small"
                          style={select_product}
                          id="select_product_check"
                          onChange={() => {
                            this.selectItem(item);
                          }} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h5" style={product_tilte}>
                            {item.name}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary" style={product_brand}>
                            {item.brand}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h5" style={product_price}>
                            {item.price} Rs
                          </Typography>
                        </CardContent>
                      </CardActionArea>

                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>
        </Container>
      </div>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const select_product:CSSProperties = {
  display: 'flex',
  position: 'absolute',
  top: '0px',
  right: '0px',
  borderRadius:'0px',
}
const bodybg = {
  backgroundColor:'#dddadaab'
}
const product_tilte = {
  fontSize: '17'
};
const product_brand = {
  fontSize: '15'
};
const product_price = {
  fontSize: '18',
  color: "#4CBB17",
};
const grid_style = {
  marginTop: '25',
  marginBottom: '25'
}
// Customizable Area End

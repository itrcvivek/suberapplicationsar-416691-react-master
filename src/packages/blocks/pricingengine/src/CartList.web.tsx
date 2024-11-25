import React from "react";

import CartListController, { ICartItem, Props } from "./CartListController";
import { Container, Grid, CardActionArea, Card, CardMedia, CardContent, Typography } from '@material-ui/core'
// Customizable Area Start
// Customizable Area End

export default class CartList extends CartListController {
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
        <Container>
          <Grid container spacing={3} >
            <Grid item>
              <h2>Product added to cart successfully</h2>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={grid_style}>
            {
              this.state.cartList.map((item: ICartItem, index: number) => {
                return (
                  <Grid item sm={3} id={"grid_item"+index.toString()}>
                    <Card className=''>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="160"
                          image={item.product_image}
                        />
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
  marginBottom: '25'
}
// Customizable Area End

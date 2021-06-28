<template>
  <div class="row">
    <!--菜单-->
    <div class="col-m-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>加入</th>
        </tr>
        </thead>
        <tbody v-for="get in getMenuItems">
        <tr>
          <th><strong>{{get.name}}</strong></th>
        </tr>
        <tr v-for="option in get.options">
          <th>{{option.size}}</th>
          <th>{{option.price}}</th>
          <th>
            <button @click="addToBasket(get,option)" class="btn btn-sm btn-outline-success">+</button>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
    <!--购物车-->
    <div class="col-sm-4 col-md-4">
      <div v-if="basket.length>0">
        <table class="table">
          <thead class="thead-default">
          <tr>
            <th>数量</th>
            <th>品种</th>
            <th>价格</th>
          </tr>
          </thead>
          <tbody v-for="item in basket">
          <tr>
            <td>
              <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
              <span>{{item.quantity}}</span>
              <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
            </td>
            <td>{{item.name}}{{item.size}}</td>
            <td>{{item.price*item.quantity}}</td>
          </tr>
          </tbody>
        </table>
        <p>总价：{{totals+"RMB"}}</p>
        <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>{{basketText}}</div>
    </div>
    <!--{{basket}}-->
  </div>
</template>

<script>
  // import axios from 'axios'
  export default {
    data() {
      return {
        basket: [],
        basketText: "购物车没有任何商品",
        // getMenuItems: {}
      }
    },
    computed: {
      getMenuItems(){
        // return this.$store.state.menuItems
        //通过getters获取数据
        return this.$store.getters.getMenuItems
      },
      totals() {
        let totalCoast = 0;
        for (let index in this.basket) {
          let individualItem = this.basket[index]
          totalCoast += individualItem.price * individualItem.quantity
        }
        return totalCoast
      }
    },
    methods: {
      addToBasket(get, option) {
        let bask = {
          name: get.name,
          size: option.size,
          price: option.price,
          quantity: 1
        }

        if (this.basket.length > 0) {
          //过滤
          let result = this.basket.filter((bask) => {
            return (bask.name === get.name && bask.price === option.price)
          })
          if (result != null && result.length > 0) {
            result[0].quantity++
          } else {
            this.basket.push(bask)
          }
        } else {
          this.basket.push(bask)
        }

      },
      decreaseQuantity(item) {
        item.quantity--
        if (item.quantity < 1) {
          // this.basket.splice(this.basket.indexOf(item),1)
          this.removeFromBasket(item)
        }
      },
      increaseQuantity(item) {
        item.quantity++
      },
      removeFromBasket(item) {
        this.basket.splice(this.basket.indexOf(item), 1)
      },
       fetchData(){
         // fetch("https://pizza-planet-77967.firebaseio.com/menu.json", {
         // }).then(res => res.json()).then(data => {
         //   this.getMenuItems=data
         // })


         // axios.get("menu.json").then(res=> this.getMenuItems=res.data)

         // this.http.get("menu.json").then(res=> this.getMenuItems=res.data)

       //  将请求的数据存储到vuex
         this.http.get("menu.json").then(res=> this.$store.commit("setMenuItems",res.data))
       }
    },
    created(){
      this.fetchData()
    }
  }

</script>

<style scoped>


</style>

import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { MenuCatComponent } from './menu-cat/menu-cat.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasProdComponent } from './categorias-prod/categorias-prod.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProdDetailsComponent } from './prod-details/prod-details.component';
import { RecoverPwdComponent } from './recover-pwd/recover-pwd.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProcessoPagoComponent } from './processo-pago/processo-pago.component';
import { SendComponent } from './send/send.component';
import { AddCardComponent } from './add-card/add-card.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { RecordComponent } from './record/record.component';
import { PayMethodsComponent } from './pay-methods/pay-methods.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { UpdProdComponent } from './upd-prod/upd-prod.component';
import { MyProductComponent } from './my-product/my-product.component';
import { MySellComponent } from './my-sell/my-sell.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { yesautchGuard } from './guards/yesautch.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Main Page',
    component: MainContentComponent
  },
  {
    path: 'main-cat',
    title: 'Menu Categorias',
    component: MenuCatComponent
  },
  {
    path: 'main-produc',
    title: 'Main Productos',
    component: ProductosComponent
  },
  {
    path: 'categorias-prod',
    title: 'Pagina Categorias',
    component: CategoriasProdComponent
  },
  {
    path: 'login',
    title: 'Login Page',
    component: LoginComponent,
    canActivate: [yesautchGuard]
  },
  {
    path: 'register',
    title: 'Register Page',
    component: RegisterComponent,
    canActivate: [yesautchGuard]
  },
  {
    path: 'categorias-prod/:prodId',
    title: 'Product Details Page',
    component: ProdDetailsComponent
  },
  {
    path: 'recoverPassword',
    title: 'Recover Password',
    component: RecoverPwdComponent,
    canActivate: [yesautchGuard]
  },
  {
    path: 'shopping_cart',
    title: 'SHOPPING CART',
    component: CarritoComponent,
    canActivate: [authGuard],
    children:[
      {
        path: 'payment',
        title: 'Payment',
        component: ProcessoPagoComponent,
        canActivate: [authGuard]
      },
      {
        path: 'confirm',
        title: 'Delivery',
        component: SendComponent,
        canActivate: [authGuard]
      },
      {
        path: 'addCard',
        title: 'Add card',
        component: AddCardComponent,
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    children:[
      {
        path: 'data',
        title: 'User Data',
        component: UserProductsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'user_record',
        title: 'User record',
        component: RecordComponent,
        canActivate: [authGuard]
      },
      {
        path: 'user_pay_method',
        title: 'User payment methods',
        component: PayMethodsComponent,
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'add_product',
    title: 'Add Product',
    component: AddProdComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Vendedor' }
  },
  {
    path: 'my_product',
    title: 'My Products',
    component: MyProductComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Vendedor' }
  },
  {
    path: 'my_product/:prodId',
    title: 'Update Product',
    component: UpdProdComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Vendedor' }
  },
  {
    path: 'my_sell',
    title: 'My Sells',
    component: MySellComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'Vendedor' }
  }
];

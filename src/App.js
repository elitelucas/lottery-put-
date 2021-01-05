import { STATE_LOGIN, STATE_SIGNUP, STATE_PHONE, STATE_VERIFY } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import { PrivateRoute } from './PrivateRoute';
import { AdminPrivateRoute } from './AdminPrivateRoute';
const MyPage = React.lazy(() => import('pages/MyPage'));
const Logout = React.lazy(() => import('pages/Logout'));
const SearchPage = React.lazy(() => import('pages/SearchPage'));
const EnjoyPage = React.lazy(() => import('pages/EnjoyPage'));
const AdminEnjoyPage = React.lazy(() => import('pages/AdminEnjoyPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const OrderPage = React.lazy(() => import('pages/OrderPage'));
const RechargePage = React.lazy(() => import('pages/RechargePage'));
const WithdrawlPage = React.lazy(() => import('pages/WithdrawlPage'));
const WithdrawlListPage = React.lazy(() => import('pages/WithdrawlListPage'));
const RechargeListPage = React.lazy(() => import('pages/RechargeListPage'));

const TransactionPage = React.lazy(() => import('pages/TransactionPage'));
// const BankPage = React.lazy(() => import('pages/BankPage'));
const AddressPage = React.lazy(() => import('pages/AddressPage'));
const AccountPage = React.lazy(() => import('pages/AccountPage'));
const AppPage = React.lazy(() => import('pages/AppPage'));
const ComplaintPage = React.lazy(() => import('pages/ComplaintPage'));
const PolicyPage = React.lazy(() => import('pages/PolicyPage'));
const AgreementPage = React.lazy(() => import('pages/AgreementPage'));
const AdminComplaintPage = React.lazy(() => import('pages/AdminComplaintPage'));
const AdminWithdrawlPage = React.lazy(() => import('pages/AdminWithdrawlPage'));
const AdminRewardPage = React.lazy(() => import('pages/AdminRewardPage'));
const AdminRechargePage = React.lazy(() => import('pages/AdminRechargePage'));
const AdminUsersPage = React.lazy(() => import('pages/AdminUsersPage'));
const AdminUserPage = React.lazy(() => import('pages/AdminUserPage'));

const PromotionPage = React.lazy(() => import('pages/PromotionPage'));
const PromotionListPage = React.lazy(() => import('pages/PromotionListPage'));

const ApplyPage = React.lazy(() => import('pages/ApplyPage'));
const RefererPage = React.lazy(() => import('pages/RefererPage'));
const AboutPage = React.lazy(() => import('pages/AboutPage'));
const AboutUSPage = React.lazy(() => import('pages/AboutUSPage'));
const ContactPage = React.lazy(() => import('pages/ContactPage'));
const TermsPage = React.lazy(() => import('pages/TermsPage'));
const RefundPage = React.lazy(() => import('pages/RefundPage'));
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {

  render() {
    // console.log(localStorage.getItem('auth'));
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup/:ref_code"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/phone"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_PHONE} />
              )}
            />
            <LayoutRoute
              exact
              path="/verify"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_VERIFY} />
              )}
            />
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <PrivateRoute exact path="/" component={EnjoyPage} />
                <Route exact path="/logout" component={Logout} />
                <AdminPrivateRoute exact path="/enjoy-admin" component={AdminEnjoyPage} />
                <PrivateRoute exact path="/my" component={MyPage} />
                <PrivateRoute exact path="/my/order" component={OrderPage} />
                <PrivateRoute exact path="/my/promotion" component={PromotionPage} />
                <PrivateRoute exact path="/my/recharge" component={RechargePage} />
                <PrivateRoute exact path="/my/promotionList" component={PromotionListPage} />
                <PrivateRoute exact path="/my/apply" component={ApplyPage} />
                <PrivateRoute exact path="/my/referers" component={RefererPage} />
                <PrivateRoute exact path="/my/withdrawl" component={WithdrawlPage} />
                <PrivateRoute exact path="/my/withdrawlList" component={WithdrawlListPage} />
                <PrivateRoute exact path="/my/rechargeList" component={RechargeListPage} />

                <PrivateRoute exact path="/my/transaction" component={TransactionPage} />
                {/* <PrivateRoute exact path="/my/bank" component={BankPage} /> */}
                <PrivateRoute exact path="/my/address" component={AddressPage} />
                <PrivateRoute exact path="/my/account" component={AccountPage} />
                <PrivateRoute exact path="/my/app" component={AppPage} />
                <PrivateRoute exact path="/my/complaint" component={ComplaintPage} />
                <AdminPrivateRoute exact path="/complaint-admin" component={AdminComplaintPage} />
                <AdminPrivateRoute exact path="/withdrawl-admin" component={AdminWithdrawlPage} />
                <AdminPrivateRoute exact path="/reward-admin" component={AdminRewardPage} />
                <AdminPrivateRoute exact path="/users" component={AdminUsersPage} />
                <AdminPrivateRoute exact path="/user/:id" component={AdminUserPage} />
                <Route exact path="/my/policy" component={PolicyPage} />
                <PrivateRoute exact path="/my/agreement" component={AgreementPage} />
                <AdminPrivateRoute exact path="/recharge-admin" component={AdminRechargePage} />
                {/* <Route exact path="/about" component={AboutPage} />
                <Route exact path="/aboutUS" component={AboutUSPage} />
                <Route exact path="/contact" component={ContactPage} />
                <Route exact path="/terms" component={TermsPage} />
                <Route exact path="/refund" component={RefundPage} /> */}
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);

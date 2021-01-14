import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import {
  Col, InputGroup, InputGroupAddon, Input, FormGroup, Label, Button,
  Row
} from 'reactstrap';
import {
  FaArrowCircleLeft, FaSearch, FaKey,
  FaBars
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Typography from '../components/Typography';
import bn from 'utils/bemnames';
const bem = bn.create('page');
const WithdrawlPage = (props) => {
  var auth = JSON.parse(localStorage.getItem('auth'));
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [total, setTotal] = useState(auth.user.budget);
  const [accNo, setAccNo] = useState("");
  const [province, setProvince] = useState("");
  const [accName, setAccName] = useState("");
  const [bankCode, setBankCode] = useState("KBANK");
  const apply = () => {
    console.log(JSON.stringify({ amount, password, bankCode, accName, accNo }));
    if (amount >= 100) {
      (async () => {
        const response = await fetch("/api/withdrawl", {
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('auth')).userToken

          },
          body: JSON.stringify({ amount, password, bankCode, accName, accNo, province })
        });
        if (response.status == 401)
          props.history.push('/login');
        const data = await response.json();
        if (response.status == 200) {
          alert(data.message);
          auth.user.budget = parseFloat(auth.user.budget) - parseFloat(amount);
          localStorage.setItem('auth', JSON.stringify(auth));
          setTotal(auth.user.budget);
        }
        else
          alert(data.error);
      })();
    } else {
      alert("Only more than 100 inr allowed!");
    }

  };
  const [bank, setBank] = useState(0);
  useEffect(() => {
    if (bank == "Add Bank Card") {
      props.history.push('/bank');
    }
  }, [bank]);
  return (
    <Page title={(<><Link to="/my"><Typography type="h4" className={bem.e('title')}><FaArrowCircleLeft /> Withdrawal</Typography></Link><Link color="link" to='/my/withdrawlList' style={{ "padding": "20px" }}><FaBars /></Link></>)} className="MyPage"  >

      <Row>
        <Col md={12} style={{ textAlign: 'center' }} className={'mt-3'}>
          <h3>Balance: $ {total}</h3>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text">$</span></InputGroupAddon>
            <Input value={amount} type="number" max={parseFloat(auth.user.budget)} placeholder="Enter withdrawal amount" onChange={(e) => { setAmount(e.target.value) }} />
          </InputGroup>
          <span style={{ fontSize: '0.7rem', fontWeight: '300', marginLeft: '30px' }}>Fee {Math.floor(amount * 0.03)} , to account {Math.ceil(amount * 0.97)}</span>
          {/* <FormGroup>
              <Label for="exampleSelect">Payout</Label>
              <Input type="select" value={bank} name="select" id="exampleSelect" className='form-control' onChange={(e)=>setBank(e.target.value)} >
                {
                  auth.user.bank_card.map((ele,key)=>(
                    <option key={key} value={key}>{ele.actual_name+" "+ele.bank_account}</option>
                  ))
                }
                <option>Add Bank Card</option>                
              </Input>
            </FormGroup> */}
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text"><FaKey /></span></InputGroupAddon>
            <Input value={password} type="password" placeholder="Enter your login password" onChange={(e) => { setPassword(e.target.value) }} />
          </InputGroup>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text">Bank Code</span></InputGroupAddon>
            <Input type="select" name="method" value={bankCode} onChange={(e) => setBankCode(e.target.value)}>
              <option value="KBANK">Kasikornbank</option>
              <option value="BBL">BANGKOK BANK</option>
              <option value="BAAC">Bank for Agriculture and Agricultural Cooperatives</option>
              <option value="BOT">Bank of Thailand</option>
              <option value="KTB">Krung Thai Bank</option>
              <option value="TMB">TMB BANK</option>
              <option value="SCB">The Siam Commercial Bank</option>
              <option value="CIMBT">CIMB Thai Bank</option>
              <option value="UOB">United Overseas Bank</option>
              <option value="BAY">Bank of Ayudhya</option>
              <option value="GSB">Government Savings Bank</option>
              <option value="GHB">Government Housing Bank</option>
              <optopn value="EXIM">Export-Import Bank of Thailand</optopn>
              <option value="TBANK">Thanachart Bank</option>
              <option value="ISBT">Islamic Bank of Thailand</option>
              <option value="TISCO">TISCO Bank</option>
              <option value="KKP">KIATNAKIN BANK</option>
              <option value="ICBCT">ICBC Bank</option>
              <option value="TCD">Thai Credit Retail Bank</option>
              <option value="LHFG">LH Bank</option>
              <option value="SME">SME Development Bank</option>
              <option value="SCBT">Standard Chartered</option>
              <option value="CITI">Citibank Thailand</option>
              <option value="MEGA">mega international commercial bank</option>
              <option value="BOC">Bank of China (Thai)</option>
              <option value="ANZ">Australia and New Zealand Banking Group Limited</option>
              <option value="SMBT">Sumitomo Mitsui Trust Bank</option>

            </Input>
          </InputGroup>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text">IFSC Code</span></InputGroupAddon>
            <Input value={province} type="text" placeholder="Enter IFSC Code" onChange={(e) => { setProvince(e.target.value) }} />
          </InputGroup>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text">Account No</span></InputGroupAddon>
            <Input value={accNo} type="text" placeholder="Enter your account number" onChange={(e) => { setAccNo(e.target.value) }} />
          </InputGroup>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text">Account Name</span></InputGroupAddon>
            <Input value={accName} type="text" placeholder="Enter your account name" onChange={(e) => { setAccName(e.target.value) }} />
          </InputGroup>
        </Col>
        <Col md={12} style={{ textAlign: 'center' }} className={'mt-3'}>
          <Button onClick={apply} color="success"> Withdrawal </Button>
        </Col>
      </Row>
      <Row>
        <div style={{ "height": '100px' }}></div>
      </Row>
    </Page>
  );
};

export default WithdrawlPage 

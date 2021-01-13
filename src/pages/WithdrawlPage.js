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
          <h3>Balance: ₹ {total}</h3>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text">₹</span></InputGroupAddon>
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
            <option value="KBANK">KASIKORNBANK PCL</option>
              <option value="BBL">BANGKOK BANK PUBLIC COMPANY LTD.</option>
              <option value="BAAC">BANK FOR AGRICULTURE AND AGRICULTURAL CO-OPERATIVES</option>
              <option value="BOA">BANK OF AMERICA NT&SA</option>
              <option value="BAY">BANK OF AYUDHAYA PUBLIC COMPANY LTD.</option>
              <option value="BOC">Bank of China (Thai) PCL</option>
              <option value="BNPP">BNP PARIBAS BANGKOK BRANCH</option>
              <option value="CIMB">CIMB THAI BANK PUBLIC COMPANY LTD.</option>
              <option value="CITI">CITI BANK N.A.</option>
              <option value="DB">Deutsche Bank AG</option>
              <option value="GHB">GOVERNMENT HOUSING BANK</option>
              <option value="ICBC">INDUSTRIAL AND COMMERCIAL BANK OF CHINA (THAI) PCL</option>
              <option value="TIBT">ISLAMIC BANK OF THAILAND</option>
              <option value="CHAS">JPMorgan Chase Bank, Bangkok Branch</option>
              <option value="KKB">KIATNAKIN BANK PCL</option>
              <option value="KTB">KRUNG THAI BANK PUBLIC COMPANY LTD.</option>
              <option value="LHBA">Land and Houses Bank</option>
              <option value="MEGA">MEGA INTERNATIONAL COMMERCIAL BANK</option>
              <option value="MHCB">MIZUHO CORPORATE BANK</option>
              <option value="SCBT">STANDARD CHARTERED BANK THAI PCL.</option>
              <option value="SMTB">Sumitomo Mitsui Trust Bank (Thai) PCL.</option>
              <option value="TBNK">Thanachart Bank Public Company Limited</option>
              <option value="GSB">THE GOVERNMENT SAVING BANK</option>
              <option value="HSBC">THE HONGKONG & SHANGHAI CORPORATION LTD.</option>
              <option value="SCB">THE SIAM COMMERCIAL BANK PUBLIC COMPANY</option>
              <option value="SMBC">THE SUMITOMO MITSU BANKING CORPORATION</option>
              <option value="TCRB">THE THAI CREDIT RETAIL BANK</option>
              <option value="TISCO">TISCO Bank PCL</option>
              <option value="TMB">TMB BANK PUBLIC COMPANY LTD.</option>
              <option value="UOB">UNITED OVERSEAS BANK (THAI) PUBLIC COMPANY LTD.</option>
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

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
  const [bankCode, setBankCode] = useState("IDPT0001");
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
              <option value="IDPT0001">Canara bank</option>
              <option value="IDPT0002">DCB bank</option>
              <option value="IDPT0003">Federal bank</option>
              <option value="IDPT0004">HDFC bank</option>
              <option value="IDPT0005">Punjab National bank</option>
              <option value="IDPT0006">Indian bank</option>
              <option value="IDPT0007">ICICI bank Industrial Credit Investment Bank
of India</option>
              <option value="IDPT0008">Syndicate bank</option>
              <option value="IDPT0009">Karur vysya  bank</option>
              <option value="IDPT0010">Union Bank of India</option>
              <option value="IDPT0011">Kotak Mahindra bank</option>
              <option value="IDPT0012">IDFC first bank</option>
              <option value="IDPT0013">Andra bank</option>
              <option value="IDPT0014">Karnataka bank</option>
              <option value="IDPT0015">ICICI Corporate Bank (public account)</option>
              <option value="IDPT0016">Axis bank</option>
              <option value="IDPT0017">UCO bank</option>
              <option value="IDPT0018">South Indian bank</option>
              <option value="IDPT0019">Yes bank</option>
              <option value="IDPT0020">Standard Chartered bank</option>
              <option value="IDPT0021">State Bank of India</option>
              <option value="IDPT0022">Indian overseas bank</option>
              <option value="IDPT0023">Bandhan bank</option>
              <option value="IDPT0024">Central Bank of India</option>
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

import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination, PaginationItem, PaginationLink

} from 'reactstrap';
import {
  FaHourglassHalf, FaMoneyCheck, FaTimesCircle,
  FaArrowCircleLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Typography from '../components/Typography';
import bn from 'utils/bemnames';
const bem = bn.create('page');
const AdminWithdrawl = (props) => {
  const [status, setStatus] = useState(2);
  const [list, setList] = useState([]);
  const [view, setView] = useState(-1);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const toggle = (no) => () => {
    setView(no);
    // console.log(no);
    // console.log(list.findIndex(ele=>ele.userId===no));

  };
  const postReply = async (id, approved) => {
    const response = await fetch("/api/withdrawl-admin", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "Authorization": JSON.parse(localStorage.getItem('auth')).userToken

      },
      body: JSON.stringify({
        id: list[id]._id,
        status: approved
      })
    });

    if (response.status < 400 && approved == 1) {
      alert("Withdrew successfully!");
      var aa = JSON.parse(JSON.stringify(list));
      aa.splice(id, 1);
      setList(aa);
    } else if (response.status < 400) {
      alert("Declined successfully!");
      var aa = JSON.parse(JSON.stringify(list));
      aa.splice(id, 1);
      setList(aa);
    } else if (response.status >= 400 && approved == 1) {
      alert("Failed in withdrawal!");
      var aa = JSON.parse(JSON.stringify(list));
      aa.splice(id, 1);
      setList(aa);

    } else {
      alert("Failed in decline!");

    }

    setView(-1);
  }
  const download = async () => {
    const response = await fetch(`/api/withdrawl-admin-download/${status}`, {
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "Authorization": JSON.parse(localStorage.getItem('auth')).userToken
      }
    });
    const data = await response.json();
    let content = `orderID  User  Amount Status\n`;
    for (let i = 0; i < data.length; i++) {
      if(!data[i].user)
        continue;
      content += data[i]._id + "\t" + data[i].user.phone + "\t" + data[i].order_amount + "\t" + (data[i].status == 0 ? "Waiting" : (data[i].status == 1 ? "Success" : (data[i].status == -1 ? "Declined" : "Failed")));
      content += "\n";
    }
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'application/text' });
    element.href = URL.createObjectURL(file);
    element.download = "Withdrawals.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

  }

  useEffect(() => {
    (async () => {
      console.log(status);
      const response = await fetch(`/api/withdrawl-admin/${status}/${page}`, {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "Authorization": JSON.parse(localStorage.getItem('auth')).userToken

        }
      });
      if (response.status == 401)
        props.history.push('/login');
      try {
        if (response.status < 400) {
          const data = await response.json();
          await setList(data.data);
          setPage(parseInt(data.page));
          setLast(parseInt(data.last_page));
        }
      } catch (err) {

      }
      // console.log(data.data);

    })();
  }, [status, page]);
  return (
    <Page title={(<><Link to="/my"><Typography type="h4" className={bem.e('title')}><FaArrowCircleLeft /> Admin Withdrawal</Typography></Link></>)} className="MyPage"
    >
      <Row>
        <Col md={12}>
          <Input type="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="2">All</option>
            <option value="0">Waiting</option>
            <option value="1">Succeed</option>
            <option value="-1">Delined</option>
            <option value="-2">Failed</option>
          </Input>
        </Col>

      </Row>
      <Row>
        <Col md={12}>
          <Button color="primary" onClick={download} >Download</Button>
        </Col>

      </Row>
      <Row>
        <Col md={12}>
          {
            (list && list.length > 0) ?
              list.map((ele, key) => (
                <Button tag="a" className={'form-control'} color="link" onClick={toggle(key)} key={key} style={{ marginBottom: '0rem', height: "70px" }}>{ele.userPhone},   {ele.userNickname} : ₹ {ele.order_amount}
                  <br /> ( {ele._id} )
                  <span style={{ float: 'right' }}>{ele.status == 0 ? (<FaHourglassHalf className="text-warning" />) : (
                    ele.status == 1 ? (<FaMoneyCheck className="text-success" />) : (
                      ele.status == -1 ? (<FaTimesCircle className="text-danger" />) : (<FaTimesCircle className="text-danger" />)
                    )
                  )}</span></Button>
              )) : ''
          }

        </Col>

      </Row>
      <Row>
        <Col md={12}>
          <Pagination size="sm" aria-label="Page navigation example">
            {
              page > 1 ? (
                <PaginationItem>
                  <PaginationLink previous onClick={() => setPage(1)} />
                </PaginationItem>
              ) : ''
            }
            {
              page > 1 ? (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page - 1)}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              ) : ''
            }

            <PaginationItem active>
              <PaginationLink >
                {page}
              </PaginationLink>
            </PaginationItem>
            {
              page < last ? (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page + 1)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ) : ''
            }
            {
              page < last ? (
                <PaginationItem>
                  <PaginationLink next onClick={() => setPage(last)} />
                </PaginationItem>
              ) : ''
            }


          </Pagination>
        </Col>
      </Row>
      <Row>
        <div style={{ "height": '60px' }}></div>
      </Row>
      <Modal
        isOpen={view !== -1}
        toggle={() => setView(-1)}
      >
        <ModalHeader toggle={() => setView(-1)}>Withdrawal Information</ModalHeader>
        {
          (view > -1 && list[view]) ? (
            <ModalBody>
              <Row>
                <Col md={12}>
                  <Form>
                    <FormGroup>
                      <Label for="orderID">Order ID</Label>
                      <Input type="text" disabled id="orderID" className='form-control' value={list[view]._id} />

                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect1">User Phone</Label>
                      <Input type="text" disabled id="exampleSelect1" className='form-control' value={list[view].userPhone} />

                    </FormGroup>
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Input type="text" disabled value={list[view].status == 0 ? 'Waiting' : (list[view].status == 1 ? 'Completed' : (list[view].status == -1 ? 'Declined' : 'Failed'))} name="status" id="status" className='form-control' />
                    </FormGroup>
                    <FormGroup>
                      <Label for="period1">Amount</Label>
                      <Input type="text" disabled value={list[view].order_amount} name="order_amount" id="order_amount" className='form-control' />
                    </FormGroup>
                    <FormGroup>
                      <Label for="bank_code">Bank Name</Label>
                      <Input type="text" disabled value={list[view].bank_code} name="bank_code" id="bank_code" className='form-control' />
                    </FormGroup>
                    <FormGroup>
                      <Label for="province">Province</Label>
                      <Input type="text" disabled value={list[view].province} name="province" id="province" className='form-control' />
                    </FormGroup>
                    <FormGroup>
                      <Label for="acc_no">Account No</Label>
                      <Input type="text" disabled value={list[view].acc_no} name="acc_no" id="acc_no" className='form-control' />
                    </FormGroup>
                    <FormGroup>
                      <Label for="acc_name">Account Name</Label>
                      <Input type="text" disabled value={list[view].acc_name} name="acc_name" id="acc_name" className='form-control' />
                    </FormGroup>

                  </Form>
                </Col>
              </Row>
              {
                list[view].status == 0 ? (
                  <Row>
                    <Button style={{ width: '130px', marginLeft: 'auto', marginRight: 'auto' }} color="primary" onClick={() => postReply(view, 1)}>
                      Approve
                    </Button>
                    <Button style={{ width: '130px', marginLeft: 'auto', marginRight: 'auto' }} color="secondary" onClick={() => postReply(view, -1)}>
                      Decline
                    </Button>
                  </Row>
                ) : ""
              }

              <br />

              <Row>
                <Link style={{ marginLeft: 'auto', marginRight: 'auto' }} color="success" to={'/user/' + list[view].userId}>
                  User Information
                </Link>


              </Row>
            </ModalBody>
          ) : ''
        }

        <ModalFooter>
          {/* Decline/ approve/completed/error  */}



        </ModalFooter>
      </Modal>

    </Page>
  );
};

export default AdminWithdrawl 

import { Card } from 'antd';
function ToolCard() {


    return (
      <div>
          <Card
    title="Card title"
    extra={<a href="#">More</a>}
    bordered={false}
    style={{
      width: 300,
    }}
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
      </div>
    )
  }
  
  export default ToolCard
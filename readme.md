## Bắt đầu

npm install -g create-react-app

npx create-react-app my-app

## Các khái niệm cơ bản

1. Component
Là cái khối hay là các bộ phận nhỏ. Ta có thể chia ra thành các bộ phận nhỏ. Ví dụ như ta có 1 đoạn HTML như sau:

<div id="blog-list">
    <div id="blog-item">
        <div id="user">
            <div id="user-name">
            </div>
            <div id="user-age">
            </div>
        </div>
        <div id="blog-content">
        </div>
    </div>
</div>

Như ví dụ trên ta có thể hiểu sẽ có các bộ phận như bộ phận to nhất là **blog-list**, trong blog-list sẽ có nhiều các **blog-item**, trong blog-item sẽ có ** user ** và **blog-content**.
Để tạo ra các khối compoment thì ta dùng đến phương thức createClass và tham số là đối tượng đặc tả của compoment. Đối tượng đặc tả này bao gồm các phương thức để hình thành nên component. Trong hàm đó, bạn sẽ trả về một mô tả cho việc bạn muốn React render cái gì lên trên page. Tối sẽ làm 1 ví dụ render 1 component là user:

var UserComponent = React.createClass({
    render: function () {
        return (
            <div className="user">
                <p>Ho va ten: </p>
                <p>Tuoi: </p>
            </div>
        )
    }
});


Ngoài ra cũng có việc các component lồng nhau tức là trong Component này lại có Component khác. Như cùng ví dụ trên thì trong Blog Item sẽ có Component User. Vậy ta sẽ làm như sau:

    var BlogItemComponent = React.createClass({
        render: function () {
            return (
                <div className="blog-item">
                    <UserComponent />
                    <div className="blog-content" />
                </div>
            )
        }
    });

Như vậy trong BlogItem sẽ có Component nữa là User được gọi trong đó.

2. Props
Như ở phần trên các bạn đã thấy, chúng ta có thể lồng các component với nhau. Nhưng nếu lồng với nhau thì chúng ta muốn truyền data từ component này sang component khác thì sẽ phải làm như thế nào. Chính vì thế React đưa ra 1 khái niệm đó là **props** tức là việc truyền data từ ngoài vào component. Trong ví dụ trên ta có thể truyền thêm data từ **BlogItemComponent** sang **UserComponent**. Vậy giờ ta sẽ sửa lại 1 chút ở UserComponent như sau
```
var UserComponent = React.createClass({
    render: function () {
        return (
            <div className="user">
                <p>Ho va ten: {this.props.hoten} </p>
                <p>Tuoi: {this.props.tuoi}</p>
            </div>
        )
    }
});
```
Như vậy ta thêm vào UserComponent 2 props là hoten và tuổi. Vậy để truyền data từ BlogItemComponent sang ta làm như sau:

```
 var BlogItemComponent = React.createClass({
    render: function () {
        return (
            <div className="blog-item">
                <UserComponent hoten="Nguyễn Văn A" tuoi="17" />
                <div className="blog-content" />
            </div>
        )
    }
});
```

Bạn chỉ việc sửa <UserComponent hoten="Nguyễn Văn A" tuoi="17" /> là xong.

3. State
Ngoài việc nhận data từ compoent khác gửi vào thì đôi khi ngay trong bản thân component cũng cần phải có data riêng của nó. Trong React thì data của từng riêng component này được lưu vào State. Vậy State khác Props ở điểm gì? Props là từ các component khác truyền vào cho nên việc xử lý thay đổi dữ liệu là không thể. Còn state là biến nội bộ trong Component. Vì thế ta có thể dễ dàng xử lý dữ liệu tại đó. Để xử dụng được state thì ta cần khai báo State trước bằng hàm getInitialState(), tại hàm này ta khai báo các biến cũng như các giá trị mặc định. Sau đó muốn thay đổi state thì ta dùng hàm this.setState(). Như component UserComponent ta thêm state sẽ như sau:

   var UserComponent = React.createClass({
       getInitialState(): function () {
           return  {
               hoten: '',
               tuoi: 0
           }
       },
       render: function () {
           this.setState('hoten', this.props.hoten);
           this.setState('tuoi', this.props.tuoi);
           return (
               <div className="user">
                   <p>Ho va ten: {this.state.hoten}</p>
                   <p>Tuoi:{this.state.tuoi} </p>
               </div>
           )
       }
   });

## Kết nối sang html file
Như ta đã thấy tất cả những việc trên ta hoàn toàn làm ở 1 file js, việc tao component rồi các sự kiện truyền data, vậy làm sao để để đưa toàn bộ phần js này sang view thì đầu tiên ở file html ta cần tạo 1 div có attribute id chỉ định nào đó

<div id="react-content"></div>

Tiếp đến ta render sang Id này với đoạn code như sau (Lưu ý: tùy version của React mà đoạn này có sự khác biệt, bạn nên check doc của chính version React các bạn lấy về dùng nhé)

React.render(<BlogItem />,  document.getElementById("app"));
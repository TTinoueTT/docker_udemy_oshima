require 'sinatra'
require 'sinatra/reloader'
require 'mysql2'

#tasks = [
#  {
#    title: "フロントエンドの実装",
#    createdAt: Time.now
#  },
#  {
#    title: "バックエンドの実装",
#    createdAt: Time.now
#  }
#]

get '/' do
  'Hello world!'
end

get '/api/hello' do
  {
    message: 'Hello World!'
  }.to_json
end

# ルーティングの追記
#get '/api/tasks' do
#  {
#    tasks: tasks
#  }.to_json
#end


get '/api/tasks' do
  # connect メソッドでユーザログイン
  client = connect
  # クエリを実行して結果を変数にセット
  result_set = client.query('SELECT id, title, created_at FROM tasks')

  tasks = result_set.map do |row|
    {
      id: row["id"],
      title: row["title"],
      createdAt: row["created_at"]
    }
  end

  client.close

  {
    tasks: tasks
  }.to_json

end

#post '/api/tasks' do
#  request_body = JSON.parse(request.body.read)
#  # logger.info request_body
#  # 保存する処理を行う、myapp.rbにて用意しているtasks変数の中身を追加する
#  task = {
#    title: request_body["title"],
#    createdAt: Time.now
#  }
#
#  tasks.push task
#  task.to_json
#end

# 非同期でタスクを登録する処理も変更
post '/api/tasks' do
  request_body = JSON.parse request.body.read
  title = request_body["title"]
  client = connect

  statement = client.prepare("INSERT INTO tasks (title) values (?)")
  statement.execute(title)

  client.close
end

def connect
  Mysql2::Client.new(
    :host => "mysql",
    :database => "mydb",
    :username => "myuser",
    :password => "password",
    :connect_timeout => 5 # 接続に5秒以上かかったらタイムアウトする
  )
end
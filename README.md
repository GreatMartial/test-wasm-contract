air_drop合约用于跨合约调用erc20合约，实现空投

项目结构：
1. artifacts: 包含cargo-contract编译的wasm文件
2. contract: 包含 air_drop和erc20合约源码
3. scrips: redspot部署脚本
4. tests: 简单的合约测试脚本


## 问题：
在测试脚本中，两个合约关联部署后，我只通过air_drop中非常简单的一个查询方法，在europa中的合约执行log，便提示了sandbox_result_ok: Value为 7的错误。

## 执行环境:
redspot 0.11.5
europa master(commit id: f6da65d2d742f90914ae701e7ed2d8fd57d39c07)
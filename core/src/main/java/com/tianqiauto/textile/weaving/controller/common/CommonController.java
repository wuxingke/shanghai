package com.tianqiauto.textile.weaving.controller.common;

import com.tianqiauto.textile.weaving.model.base.Dict_Type;
import com.tianqiauto.textile.weaving.model.base.Gongxu;
import com.tianqiauto.textile.weaving.model.sys.Param_LeiBie;
import com.tianqiauto.textile.weaving.repository.Dict_TypeRepository;
import com.tianqiauto.textile.weaving.repository.GongXuRepository;
import com.tianqiauto.textile.weaving.repository.SheBeiParamLeiBieRepository;
import com.tianqiauto.textile.weaving.service.common.CommonService;
import com.tianqiauto.textile.weaving.util.result.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @ClassName CommonController
 * @Description TODO
 * @Author lrj
 * @Date 2019/3/25 15:14
 * @Version 1.0
 **/
@RestController
@RequestMapping("common")
public class CommonController {

    @Autowired
    private GongXuRepository gongXuRepository;

    @Autowired
    private SheBeiParamLeiBieRepository sheBeiParamLeiBieRepository;

    @Autowired
    private Dict_TypeRepository dict_typeRepository;

    @Autowired
    private CommonService commonService;


    @GetMapping("findAllGX")
    @ApiOperation(value = "查询所有工序")
    public Result findAllGX(){
        List<Gongxu> list = gongXuRepository.findAllGX();
        return Result.ok("查询成功!",list);
    }

    @GetMapping("findAllJX")
    @ApiOperation(value = "查询工序下机型")
    public Result findAllJX(Gongxu parent_gongxu){
        List<Gongxu> list = gongXuRepository.findAllByParentGongxu(parent_gongxu);
        return Result.ok("查询成功!",list);
    }

    @GetMapping("findAllCSLB")
    @ApiOperation(value = "根据工序机型查询参数类别")
    public Result findAllCSLB(Gongxu gongxu, Gongxu jixing){
        List<Param_LeiBie> list = sheBeiParamLeiBieRepository.findAllByGongxuAndJixing(gongxu, jixing);
        return Result.ok("查询成功!",list);
    }

    @GetMapping("findAllDictVal")
    @ApiOperation(value = "根据数据字典类别查询数据字典值",notes = "比如：传入轮班的code，查出来所有轮班值")
    public Result findAllDictVal(String code){

        Dict_Type dict_type = dict_typeRepository.findByCode(code);
        return Result.ok("查询成功!",dict_type);
    }

    @GetMapping("findUserZu")
    @ApiOperation(value = "获取员工分组")
    public Result findUserZu(){
        List<Map<String,Object>> list = commonService.findUserZu();
        return Result.ok(list);
    }

}
